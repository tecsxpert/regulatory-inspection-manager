CREATE TABLE inspections (
    id BIGSERIAL PRIMARY KEY,
    inspection_name VARCHAR(255) NOT NULL,
    regulatory_body VARCHAR(255) NOT NULL,
    inspection_date DATE NOT NULL,
    status VARCHAR(50) NOT NULL,
    priority VARCHAR(50),
    description TEXT,
    score INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    deleted BOOLEAN DEFAULT FALSE
);

CREATE INDEX idx_status ON inspections(status);
CREATE INDEX idx_inspection_date ON inspections(inspection_date);