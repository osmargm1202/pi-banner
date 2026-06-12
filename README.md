# pi-banner

ORGM Pi header/control-plane and banner package.

Owns the ORGM ASCII header/control-plane commands and keeps a scaffold for future banner/header work. Agent-status/widgets live in `pi-subagents`.

## Install

Standalone install:

```bash
pi install git:github.com/osmargm1202/pi-banner
```

Recommended ORGM stack install:

```bash
for pkg in pi-mem pi-caveman pi-harness pi-footer; do
  pi install git:github.com/osmargm1202/$pkg
done
```

## ORGM Pi stack

This package is part of the ORGM Pi extension stack.

Packages:

- `pi-mem`: local memory/context index provider.
- `pi-caveman`: caveman runtime and shared state events.
- `pi-harness`: ORGM bundle/meta-package and compatibility bridge.
- `pi-footer`: Zentui-based editor/footer UI that displays ORGM status.
- `pi-subagents`: subagent deployment plus agent-status widgets.

## Coupled integrations

Produces:

- ORGM ASCII header and `/orgm-*` control-plane commands.
- Future banner/header behavior. Not agent-status/widgets.

Consumes:

- Pi extension APIs.
- ORGM stack events only where required by extracted behavior.

Hard dependencies:

- None planned. Package should load alone.

Soft dependencies:

- `pi-subagents` owns agent-status/widgets.
- `pi-footer` remains editor/footer UI owner.

## Development

```bash
npm test
npm run pack:check
```
