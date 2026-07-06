# Shift at Midnight Compass - Site Brief

## Status

```text
PLAN_READY_DRAFT / FAST_TEST_CANDIDATE / NO_BUILD_YET
```

## Core Player Problem

Players are searching for whether `Shift at Midnight` is playable, what platforms and demo options are real right now, and how to understand the game loop without spoiler-heavy walkthroughs.

## Site Mode

Fast-test guide/status site.

This is not a full wiki and not a walkthrough site. It should validate demand around release/platform/demo/Joe's Diner questions with a useful source-backed player tool.

## First Player Tool

```text
Shift Status Board + Customer Check Workflow
```

The homepage should make it clear:

- current Steam status;
- demo status;
- Xbox/platform status;
- release-date conflict status;
- what is confirmed, partial, or HOLD;
- where source links come from.

## First-Version Thickness Plan

Do not create a thin release-date shell. V1 should include:

- status board on homepage;
- release conflict tracker;
- demo availability table;
- platform capability table;
- source confidence matrix;
- spoiler-safe customer-check workflow;
- Joe's Diner newsletter FAQ with the exact answer held unless verified;
- official video/source link panel with no copied media;
- internal links between all status pages;
- visible NOW / PARTIAL / HOLD boundary blocks.

## NOW Facts

- `Shift at Midnight` is an online co-op detective horror game.
- Steam store page exists and currently shows Coming soon.
- Steam multiplayer demo page exists.
- Xbox store page exists.
- User-provided Google Trends screenshots show sustained US 30-day demand and rising task/platform queries.

## PARTIAL / Status-Only Facts

- Release date / launch window has conflicting public references and must be presented as a source timeline.
- Joe's Diner newsletter query has demand, but the exact answer needs official or hands-on verification.
- Official YouTube trailers can be linked for source context, but not copied into site media.

## HOLD Facts

- exact doppelganger/customer tells;
- full walkthrough;
- survival tactics;
- routes, secrets, maps, puzzle answers;
- exact controls/keybinds unless visible on official/platform sources;
- PS5 availability unless official source confirms;
- copied Steam/Xbox/YouTube/press images or thumbnails.

## Validator Seed

Block the build if public pages contain:

- unsupported final release date;
- exact Joe's Diner newsletter answer without official/source support;
- walkthrough/route/secret/spoiler content;
- tier/best-build style content;
- downloaded official or third-party media;
- claims sourced only from community/wiki/YouTube gameplay.

## Public Repo Boundary

When built, public repo may include only site runtime code and minimal `src/data` needed by the static site.

Do not upload:

- `/research/`;
- `/runs/`;
- `/data/`;
- `/.agents/`;
- project docs;
- raw screenshots;
- private source notes.
