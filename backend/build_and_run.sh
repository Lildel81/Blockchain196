#!/bin/bash

# Check for ganache-cli
if ! command -v ganache-cli &> /dev/null; then
    echo "Error: ganache-cli is not installed. Please install it before proceeding."
    exit 1
fi

# Step 1: Start Ganache CLI in the background
echo "Starting Ganache CLI..."
ganache-cli > ganache.log 2>&1 &
GANACHE_PID=$!

# Wait a moment for Ganache to initialize
sleep 5

# Step 2: Remove the build directory
echo "Removing build directory..."
rm -rf build

# Step 3: Compile the smart contract
echo "Compiling smart contract..."
truffle compile --config truffle-config.cjs
if [ $? -ne 0 ]; then
    echo "Error: Compilation failed."
    kill $GANACHE_PID
    exit 1
fi

# Step 4: Migrate the smart contract
echo "Migrating smart contract..."
truffle migrate --config truffle-config.cjs
if [ $? -ne 0 ]; then
    echo "Error: Migration failed."
    kill $GANACHE_PID
    exit 1
fi

# Step 5: Start the backend server
echo "Starting backend server..."
npm run dev
if [ $? -ne 0 ]; then
    echo "Error: Failed to start the backend server."
    kill $GANACHE_PID
    exit 1
fi

# Inform user that the backend is ready
echo "Backend is now ready to use. API is exposed for voting and getting the count!"

# Trap to clean up Ganache CLI process
trap "kill $GANACHE_PID" EXIT
