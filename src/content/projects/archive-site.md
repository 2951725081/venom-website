---
title: 'Personal Archive Website'
description: 'A static workspace for organizing notes and reviewing project decisions.'
status: organizing
startDate: '2026-09-04'
updatedDate: '2026-09-05'
topics: ['Astro', 'Personal knowledge management']
summary: 'Design and build a quiet, searchable structure for project retrospectives and technical notes.'
nextStep: 'Finish the Projects and Notes templates, then verify the GitHub Pages deployment.'
---

## Background

This archive turns scattered project notes into a durable, versioned workspace that can be revisited from any device.

## Problem

The existing starter blog is optimized for publishing outward, but it does not make current work, decisions, and unfinished material easy to resume.

## Decisions

- Keep static generation so the archive remains fast and inexpensive to host.
- Separate Projects from Notes so project retrospectives have a stable structure.
- Use a restrained editorial visual system instead of a promotional portfolio layout.

## Failed attempts

The first deployment exposed root-relative links that escaped the GitHub Pages project path. The navigation now derives its home URL from Astro's configured base path.

## Result

The repository has a clear implementation plan and a base-path-safe deployment foundation.

## Retrospective

The content model should be settled before adding search or filtering. A small, consistent archive is more useful than a large collection of loosely structured pages.

## Next step

Complete the remaining archive templates and validate the published site from the deployed URL.
