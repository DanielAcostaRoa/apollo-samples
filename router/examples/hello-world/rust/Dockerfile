# Use the rust build image from docker as our base
# renovate-automation: rustc version
FROM rust:1.72.0 as build

# Set our working directory for the build
WORKDIR /usr/src/router

# Update our build image and install required packages
RUN apt-get update
RUN apt-get -y install \
	npm \
	protobuf-compiler

# Add rustfmt since build requires it
RUN rustup component add rustfmt

# Copy the router source to our build environment
COPY . .

# Build and install the custom binary
RUN cargo run -- -s ../../graphql/supergraph.graphql -c ./router.yaml