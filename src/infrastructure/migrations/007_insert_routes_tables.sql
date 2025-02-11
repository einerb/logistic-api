INSERT INTO routes (
    id,
    origin_name, origin_street, origin_city, origin_state, origin_country, origin_postal_code, origin_lat, origin_lng,
    destination_name, destination_street, destination_city, destination_state, destination_country, destination_postal_code, destination_lat, destination_lng,
    estimated_time, distance_km, created_at, updated_at
) VALUES
    (gen_random_uuid(), 'Terminal de Transportes de Bogotá', 'Calle 192 #19-43', 'Bogotá', 'Cundinamarca', 'Colombia', '110931', 4.757, -74.047,
     'Terminal de Transportes de Medellín', 'Calle 50 #65-10', 'Medellín', 'Antioquia', 'Colombia', '050012', 6.244, -75.574,
     540, 415, NOW(), NOW()),

    (gen_random_uuid(), 'Terminal de Transportes de Cali', 'Calle 30N #2AN-29', 'Cali', 'Valle del Cauca', 'Colombia', '760046', 3.451, -76.532,
     'Terminal de Transportes de Bogotá', 'Calle 192 #19-43', 'Bogotá', 'Cundinamarca', 'Colombia', '110931', 4.757, -74.047,
     600, 460, NOW(), NOW()),

    (gen_random_uuid(), 'Terminal de Transportes de Barranquilla', 'Calle 45 #18-30', 'Barranquilla', 'Atlántico', 'Colombia', '080020', 10.968, -74.781,
     'Terminal de Transportes de Cartagena', 'Avenida Pedro de Heredia #30-20', 'Cartagena', 'Bolívar', 'Colombia', '130001', 10.400, -75.500,
     150, 120, NOW(), NOW()),

    (gen_random_uuid(), 'Terminal de Transportes de Bucaramanga', 'Diagonal 15 #55-40', 'Bucaramanga', 'Santander', 'Colombia', '680003', 7.113, -73.119,
     'Terminal de Transportes de Cúcuta', 'Avenida Libertadores #0-50', 'Cúcuta', 'Norte de Santander', 'Colombia', '540006', 7.893, -72.507,
     300, 200, NOW(), NOW()),

    (gen_random_uuid(), 'Terminal de Transportes de Pereira', 'Carrera 8 #23-60', 'Pereira', 'Risaralda', 'Colombia', '660002', 4.814, -75.694,
     'Terminal de Transportes de Manizales', 'Carrera 43 #65-100', 'Manizales', 'Caldas', 'Colombia', '170001', 5.070, -75.520,
     120, 50, NOW(), NOW()),

    (gen_random_uuid(), 'Terminal de Transportes de Armenia', 'Avenida Bolívar #10-20', 'Armenia', 'Quindío', 'Colombia', '630004', 4.533, -75.681,
     'Terminal de Transportes de Ibagué', 'Calle 42 #1-28', 'Ibagué', 'Tolima', 'Colombia', '730001', 4.438, -75.232,
     180, 100, NOW(), NOW()),

    (gen_random_uuid(), 'Terminal de Transportes de Santa Marta', 'Carrera 4 #29-20', 'Santa Marta', 'Magdalena', 'Colombia', '470001', 11.240, -74.211,
     'Terminal de Transportes de Riohacha', 'Calle 15 #12-30', 'Riohacha', 'La Guajira', 'Colombia', '440001', 11.544, -72.907,
     240, 170, NOW(), NOW()),

    (gen_random_uuid(), 'Terminal de Transportes de Villavicencio', 'Avenida 40 #28-30', 'Villavicencio', 'Meta', 'Colombia', '500001', 4.142, -73.626,
     'Terminal de Transportes de Yopal', 'Carrera 23 #12-45', 'Yopal', 'Casanare', 'Colombia', '850001', 5.337, -72.395,
     300, 200, NOW(), NOW()),

    (gen_random_uuid(), 'Terminal de Transportes de Neiva', 'Calle 8 #12-15', 'Neiva', 'Huila', 'Colombia', '410001', 2.936, -75.287,
     'Terminal de Transportes de Florencia', 'Carrera 9 #10-20', 'Florencia', 'Caquetá', 'Colombia', '180001', 1.614, -75.606,
     240, 160, NOW(), NOW()),

    (gen_random_uuid(), 'Terminal de Transportes de Pasto', 'Calle 18 #25-30', 'Pasto', 'Nariño', 'Colombia', '520001', 1.213, -77.281,
     'Terminal de Transportes de Popayán', 'Carrera 9 #8-20', 'Popayán', 'Cauca', 'Colombia', '190001', 2.444, -76.614,
     300, 220, NOW(), NOW()),
     
    (gen_random_uuid(), 'Terminal de Transportes de Tunja', 'Carrera 12 #22-55', 'Tunja', 'Boyacá', 'Colombia', '150001', 5.535, -73.367,
     'Terminal de Transportes de Bogotá', 'Calle 192 #19-43', 'Bogotá', 'Cundinamarca', 'Colombia', '110931', 4.757, -74.047,
     180, 130, NOW(), NOW()),

    (gen_random_uuid(), 'Terminal de Transportes de Sincelejo', 'Carrera 14 #18-30', 'Sincelejo', 'Sucre', 'Colombia', '700001', 9.304, -75.397,
     'Terminal de Transportes de Montería', 'Calle 27 #7-40', 'Montería', 'Córdoba', 'Colombia', '230001', 8.748, -75.881,
     120, 90, NOW(), NOW()),

    (gen_random_uuid(), 'Terminal de Transportes de Valledupar', 'Carrera 19 #16-20', 'Valledupar', 'Cesar', 'Colombia', '200001', 10.464, -73.252,
     'Terminal de Transportes de Santa Marta', 'Carrera 4 #29-20', 'Santa Marta', 'Magdalena', 'Colombia', '470001', 11.240, -74.211,
     240, 190, NOW(), NOW()),

    (gen_random_uuid(), 'Terminal de Transportes de Popayán', 'Carrera 9 #8-20', 'Popayán', 'Cauca', 'Colombia', '190001', 2.444, -76.614,
     'Terminal de Transportes de Cali', 'Calle 30N #2AN-29', 'Cali', 'Valle del Cauca', 'Colombia', '760046', 3.451, -76.532,
     240, 140, NOW(), NOW()),

    (gen_random_uuid(), 'Terminal de Transportes de Manizales', 'Carrera 43 #65-100', 'Manizales', 'Caldas', 'Colombia', '170001', 5.070, -75.520,
     'Terminal de Transportes de Medellín', 'Calle 50 #65-10', 'Medellín', 'Antioquia', 'Colombia', '050012', 6.244, -75.574,
     180, 90, NOW(), NOW()),

    (gen_random_uuid(), 'Terminal de Transportes de Ibagué', 'Calle 42 #1-28', 'Ibagué', 'Tolima', 'Colombia', '730001', 4.438, -75.232,
     'Terminal de Transportes de Neiva', 'Calle 8 #12-15', 'Neiva', 'Huila', 'Colombia', '410001', 2.936, -75.287,
     210, 160, NOW(), NOW()),

    (gen_random_uuid(), 'Terminal de Transportes de Quibdó', 'Calle 22 #15-40', 'Quibdó', 'Chocó', 'Colombia', '270001', 5.691, -76.660,
     'Terminal de Transportes de Medellín', 'Calle 50 #65-10', 'Medellín', 'Antioquia', 'Colombia', '050012', 6.244, -75.574,
     240, 170, NOW(), NOW()),

    (gen_random_uuid(), 'Terminal de Transportes de Arauca', 'Carrera 21 #14-25', 'Arauca', 'Arauca', 'Colombia', '810001', 7.089, -70.758,
     'Terminal de Transportes de Yopal', 'Carrera 23 #12-45', 'Yopal', 'Casanare', 'Colombia', '850001', 5.337, -72.395,
     360, 250, NOW(), NOW()),

    (gen_random_uuid(), 'Terminal de Transportes de Florencia', 'Carrera 9 #10-20', 'Florencia', 'Caquetá', 'Colombia', '180001', 1.614, -75.606,
     'Terminal de Transportes de Mocoa', 'Carrera 8 #6-12', 'Mocoa', 'Putumayo', 'Colombia', '860001', 1.151, -76.647,
     180, 140, NOW(), NOW()),

    (gen_random_uuid(), 'Terminal de Transportes de Leticia', 'Avenida Internacional #2-30', 'Leticia', 'Amazonas', 'Colombia', '910001', -4.217, -69.941,
     'Puerto Nariño', 'Carrera 5 #3-15', 'Puerto Nariño', 'Amazonas', 'Colombia', '911001', -3.770, -70.379,
     120, 80, NOW(), NOW());
