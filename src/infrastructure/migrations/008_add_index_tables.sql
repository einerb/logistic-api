-- 📌 Índice para mejorar las búsquedas por fecha (filtros startDate, endDate)
CREATE INDEX idx_shipping_orders_created_at ON shipping_orders (created_at);

-- 📌 Índice para mejorar las búsquedas por estado (status)
CREATE INDEX idx_shipping_orders_status ON shipping_orders (status);

-- 📌 Índice para mejorar las búsquedas por ruta asignada
CREATE INDEX idx_shipping_orders_assigned_route_id ON shipping_orders (assigned_route_id);

-- 📌 Índice para mejorar la relación entre rutas y transportistas
CREATE INDEX idx_routes_assigned_carrier_id ON routes (assigned_carrier_id);

-- 📌 Índice para mejorar las búsquedas por transportista
CREATE INDEX idx_carriers_id ON carriers (id);

-- 📌 Índice compuesto para optimizar la paginación y ordenamiento por fecha
CREATE INDEX idx_shipping_orders_created_at_status ON shipping_orders (created_at DESC, status);