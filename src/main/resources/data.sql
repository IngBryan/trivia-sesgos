-- Sample questions about cognitive biases
-- Replace with final questions

INSERT OR IGNORE INTO question (id, text, correct_id) VALUES
(1, 'Un bate y una pelota cuestan $1.10 en total. El bate cuesta $1 más que la pelota. ¿Cuánto cuesta la pelota?', NULL),
(2, 'En un hospital nacen aproximadamente 45 bebés por día. ¿Qué porcentaje de los días más del 60% de los bebés son varones?', NULL),
(3, 'María es callada, ordenada y le gustan los libros. ¿Es más probable que sea bibliotecaria o vendedora?', NULL);

INSERT OR IGNORE INTO option (id, question_id, text) VALUES
-- Question 1: bat and ball
(1, 1, '$0.10'),
(2, 1, '$0.05'),
(3, 1, '$0.15'),
-- Question 2: hospital
(4, 2, 'Alrededor del 50%'),
(5, 2, 'Depende de cuántos bebés nazcan ese día'),
(6, 2, 'Menos del 10%'),
-- Question 3: María
(7, 3, 'Bibliotecaria'),
(8, 3, 'Vendedora'),
(9, 3, 'Igual de probable');

-- Assign correct answers
UPDATE question SET correct_id = 2 WHERE id = 1;
UPDATE question SET correct_id = 5 WHERE id = 2;
UPDATE question SET correct_id = 8 WHERE id = 3;
