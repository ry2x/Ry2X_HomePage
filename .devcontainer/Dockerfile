FROM node:24

# Install basic development tools
RUN apt update && apt install -y less man-db sudo

# Ensure default `node` user has access to `sudo`
ARG USERNAME=node
RUN echo $USERNAME ALL=\(root\) NOPASSWD:ALL > /etc/sudoers.d/$USERNAME \
    && chmod 0440 /etc/sudoers.d/$USERNAME \
    && sudo corepack enable

# Set `DEVCONTAINER` environment variable to help with orientation
# If you want to connect to the devcontainer from a local terminal, run:
# docker exec -it -u node <container_name> /bin/bash
# (Find <container_name> using: docker ps)
ENV DEVCONTAINER=true
