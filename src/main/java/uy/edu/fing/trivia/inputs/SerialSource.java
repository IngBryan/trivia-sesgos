package uy.edu.fing.trivia.inputs;

import com.fazecast.jSerialComm.SerialPort;
import com.fazecast.jSerialComm.SerialPortEvent;
import com.fazecast.jSerialComm.SerialPortMessageListener;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
import org.springframework.stereotype.Component;
import uy.edu.fing.trivia.domain.InputEvent;

import java.util.Map;
import java.util.concurrent.BlockingQueue;

/**
 * Lee líneas del puerto serie (Arduino) y las convierte en InputEvent.
 * Solo se activa si trivia.serial.port está configurado.
 */
@Component
@ConditionalOnProperty("trivia.serial.port")
public class SerialSource implements InputSource {

    private static final Logger log = LoggerFactory.getLogger(SerialSource.class);

    // Arduino manda "1","2","3" → mapear a índice 0-based como hace el frontend
    private static final Map<String, String> BUTTON_MAP = Map.of(
            "1", "0",
            "2", "1",
            "3", "2"
    );

    @Value("${trivia.serial.port}")
    private String portName;

    @Value("${trivia.serial.baud:9600}")
    private int baudRate;

    @Override
    public void start(BlockingQueue<InputEvent> queue) {
        SerialPort port = SerialPort.getCommPort(portName);
        port.setBaudRate(baudRate);
        port.setComPortTimeouts(SerialPort.TIMEOUT_READ_SEMI_BLOCKING, 0, 0);

        if (!port.openPort()) {
            log.error("No se pudo abrir el puerto serie: {}", portName);
            return;
        }

        log.info("Puerto serie abierto: {} a {} baud", portName, baudRate);

        port.addDataListener(new SerialPortMessageListener() {
            @Override
            public int getListeningEvents() {
                return SerialPort.LISTENING_EVENT_DATA_RECEIVED;
            }

            @Override
            public byte[] getMessageDelimiter() {
                return new byte[]{'\n'};
            }

            @Override
            public boolean delimiterIndicatesEndOfMessage() {
                return true;
            }

            @Override
            public void serialEvent(SerialPortEvent event) {
                String raw = new String(event.getReceivedData()).trim();
                String mapped = BUTTON_MAP.get(raw);
                if (mapped != null) {
                    queue.offer(InputEvent.fromSerial("SELECT", mapped));
                    log.debug("Serial → SELECT {}", mapped);
                } else {
                    log.warn("Dato serial ignorado: '{}'", raw);
                }
            }
        });
    }
}
