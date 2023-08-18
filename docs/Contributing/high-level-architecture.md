# High level architecture

- [Overview](#overview)
- [Components](#components)

## Overview

Add text

## Components

```mermaid
graph LR;
    tuf["<a href=https://theupdateframework.io/>TUF</a> file server<br>(default: <a href=https://tuf.fleetctl.com>tuf.fleetctl.com</a>)"];
    fleet_server[Fleet<br>Server];

    subgraph Fleetd
        orbit[orbit];
        desktop[Fleet Desktop<br>Tray App];
        osqueryd[osqueryd];

        desktop_browser[Fleet Desktop<br> from Browser];
    end

    orbit -- "Fleet Orbit API (TLS)" --> fleet_server;
    desktop -- "Fleet Desktop API (TLS)" --> fleet_server;
    osqueryd -- "osquery<br>remote API (TLS)" --> fleet_server;
    desktop_browser -- "My Device API (TLS)" --> fleet_server;

    orbit -- "Auto Update (TLS)" --> tuf;
```


```mermaid
graph LR;
    fleet_release_owner[Fleet Release<br>Owner];

    subgraph Agent
        orbit[orbit];
        desktop[Fleet Desktop<br>Tray App];
        osqueryd[osqueryd];
        desktop_browser[Fleet Desktop<br> from Browser];
    end

    subgraph Customer Cloud
        fleet_server[Fleet<br>Server];
        db[DB];
        redis[Redis<br>Live queries' results <br>go here];
        prometheus[Prometheus Server];
    end

    subgraph FleetDM Cloud
        tuf["<a href=https://theupdateframework.io/>TUF</a> file server<br>(default: <a href=https://tuf.fleetctl.com>tuf.fleetctl.com</a>)"];
        datadog[DataDog metrics]
        heroku[Usage Analytics<br>Heroku]
        log[Optional Log Location<br>Store logs here]
    end

    subgraph Customer Admin
        frontend[frontend code]
    end


    fleet_release_owner -- "Release Process" --> tuf;

    orbit -- "Fleet Orbit API (TLS)" --> fleet_server;
    orbit -- "Auto Update (TLS)" --> tuf;
    desktop -- "Fleet Desktop API (TLS)" --> fleet_server;
    osqueryd -- "osquery<br>remote API (TLS)" --> fleet_server;
    desktop_browser -- "My Device API (TLS)" --> fleet_server;

    heroku -- "Metrics from all customers" --> datadog;

    fleet_server <== "Read/Write" ==> db;


```



## Capabilities

| Capability                           | Status |
| ------------------------------------ | ------ |