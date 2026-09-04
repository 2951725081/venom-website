---
title: 'Terminal note capture tool'
description: 'A sample project entry demonstrating the full retrospective structure of the project archive.'
status: archived
startDate: 2025-03-02
updatedDate: 2025-11-18
topics: ['cli', 'plain-text', 'workflow']
summary: 'A small command-line tool that appends quick notes to a dated plain-text inbox, built to test whether frictionless capture improves note taking.'
nextStep: 'Archive the repository as a reference for plain-text inbox patterns.'
---

> **Sample entry.** This project demonstrates the structure used for every entry
> in this archive. Replace its content with real project records as they happen.

## Background

During a busy stretch of 2025 I kept losing quick thoughts between meetings.
Notes went into paper scratch pads, chat messages to myself, or nowhere at all.
I already maintained a small directory of Markdown files and wanted capture to
land there without leaving the terminal.

## Problem

Opening an editor, naming a file, and deciding where to put it was enough
friction that most fleeting thoughts were never written down. The goal was to
make capture one command with zero decisions: timestamped, dated, and appended
to a single inbox file.

## Decisions

- A single `daily/YYYY-MM-DD.md` inbox file per day, appended in chronological order.
- One command, `cap`, with no flags for the happy path.
- Plain text only. No database, no sync service, no editor plugin.
- Timestamps formatted to match the existing notes convention.

## Failed attempts

- Building a TUI browser for the inbox wasted a weekend; browsing was not the
  problem, capture was.
- Adding fuzzy full-text search before the inbox had any real content meant the
  search feature was tested against noise.
- A sync script that rewrote files based on wall-clock time corrupted two
  entries, and the whole idea of syncing was dropped.

## Result

The tool is about 80 lines of shell plus a helper script. Over eight months it
captured several hundred entries, and the daily inbox became the first place I
check when reviewing a week.

## Retrospective

The one-command constraint mattered more than any feature. The daily file made
review easy by accident: entries in one file are already grouped by time, so
"what happened last Tuesday" is one file open away. The failed search and TUI
attempts taught me to ship the capture loop first and treat every other idea as
a follow-up experiment.

## Next steps

Freeze the tool as-is and archive the repository. If capture habits change,
revisit only the inbox file format, not the tooling around it.
