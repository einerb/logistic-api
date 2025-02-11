CREATE TABLE packages (
    id UUID PRIMARY KEY,
    shipping_order_id UUID REFERENCES shipping_orders(id) ON DELETE CASCADE,
    weight FLOAT NOT NULL,
    length FLOAT NOT NULL,
    width FLOAT NOT NULL,
    height FLOAT NOT NULL,
    product_type VARCHAR(100) NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);