CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
/* initial state of db */
--\c into pally_db
CREATE TABLE users(
    id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    firstName VARCHAR(50) NOT NULL,
    lastName VARCHAR(50) NOT NULL,
    email VARCHAR(50) NOT NULL UNIQUE,
    password VARCHAR(50) NOT NULL,
    emailVerified BOOLEAN NOT NULL DEFAULT FALSE,
    isActive BOOLEAN NOT NULL DEFAULT FALSE,
    createdAt TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updatedAt TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE wallets(
    id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    type  VARCHAR(50) NOT NULL,
    availableBalance  VARCHAR(50) NOT NULL,
    ledgerBalance VARCHAR(50) NOT NULL,
    address  TEXT NOT NULL,
    userId uuid,
    FOREIGN KEY (userId) REFERENCES users(id),
    createdAt TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updatedAt TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE transactions(
    id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    action  VARCHAR(50) NOT NULL,
    amount  BIGINT NOT NULL,
    prevBalance  BIGINT NOT NULL,
    newBalance BIGINT NOT NULL,
    fee  BIGINT NOT NULL,
    spotPrice  BIGINT NOT NULL,
    walletId uuid,
    FOREIGN KEY (walletId) REFERENCES wallets(id),
    userId uuid,
    FOREIGN KEY (userId) REFERENCES users(id),
    createdAt TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updatedAt TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE logs(
    id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    userId uuid,
    FOREIGN KEY (userId) REFERENCES users(id),
    message  TEXT NOT NULL,
    createdAt TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updatedAt TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE settings(
    id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    name  VARCHAR(50) NOT NULL,
    value TEXT NOT NULL,
    createdAt TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updatedAt TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
