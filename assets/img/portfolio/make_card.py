#!/usr/bin/env python3
"""Generate 640x640 project cards for the work grid, matching the existing
proj-*.png style: deep navy ground with a faint grid, a monospace amber eyebrow,
a serif title whose second half is gold italic, a short deck, a mono callout
strip, and a row of small labelled boxes.

Run from repo root:  python3 assets/img/portfolio/make_card.py
"""
from pathlib import Path

from PIL import Image, ImageDraw, ImageFont

OUT = Path(__file__).parent
S = 640

BG = (11, 17, 32)
GRID = (16, 24, 44)
PANEL = (17, 26, 48)
BORDER = (28, 40, 68)
GOLD = (234, 207, 146)
AMBER = (182, 148, 86)
WHITE = (236, 239, 244)
BODY = (150, 158, 174)
MUTED = (122, 132, 150)

SERIF = "/System/Library/Fonts/Supplemental/Georgia.ttf"
SERIF_I = "/System/Library/Fonts/Supplemental/Georgia Italic.ttf"
MONO = "/System/Library/Fonts/Menlo.ttc"
SANS = "/System/Library/Fonts/Supplemental/Arial.ttf"


def f(path, size, index=0):
    try:
        return ImageFont.truetype(path, size, index=index)
    except Exception:
        return ImageFont.load_default()


def card(name, eyebrow, title_a, title_b, deck, callout, boxes):
    im = Image.new("RGB", (S, S), BG)
    d = ImageDraw.Draw(im)

    for x in range(0, S, 32):
        d.line([(x, 0), (x, S)], fill=GRID)
    for y in range(0, S, 32):
        d.line([(0, y), (S, y)], fill=GRID)

    d.text((50, 166), eyebrow, font=f(MONO, 12), fill=AMBER)

    ft = f(SERIF, 46)
    fti = f(SERIF_I, 46)
    d.text((50, 196), title_a, font=ft, fill=WHITE)
    w = d.textlength(title_a, font=ft)
    d.text((50 + w, 196), title_b, font=fti, fill=GOLD)

    fb = f(SANS, 15)
    for i, line in enumerate(deck):
        d.text((50, 262 + i * 21), line, font=fb, fill=BODY)

    y0 = 262 + len(deck) * 21 + 20
    d.rounded_rectangle([50, y0, S - 50, y0 + 56], radius=6, fill=PANEL, outline=BORDER)
    fm = f(MONO, 13)
    cw = d.textlength(callout, font=fm)
    d.text((50 + (S - 100 - cw) / 2, y0 + 20), callout, font=fm, fill=GOLD)

    y1 = y0 + 56 + 18
    bw = (S - 100 - 2 * 14) / 3
    for i, (label, sub) in enumerate(boxes):
        x = 50 + i * (bw + 14)
        d.rounded_rectangle([x, y1, x + bw, y1 + 72], radius=6, fill=PANEL, outline=BORDER)
        d.text((x + 13, y1 + 16), label, font=f(MONO, 10), fill=AMBER)
        d.text((x + 13, y1 + 38), sub, font=f(SANS, 11), fill=MUTED)

    im.save(OUT / name)
    print("wrote", name)


card(
    "proj-visiontrack.png",
    "COMPUTER VISION · SPATIAL MEMORY",
    "Vision", "Track",
    ["Detects and tracks every object in a room, then",
     "remembers each physical thing exactly once —",
     "with a photo, a region and a movement history."],
    'ask  "where did I leave my phone?"',
    [("A · DETECT", "YOLO11, 80 classes"),
     ("B · TRACK", "ByteTrack identity"),
     ("C · REMEMBER", "one row per object")],
)

card(
    "proj-sanhita.png",
    "LEGAL RAG · FULLY LOCAL",
    "San", "hita",
    ["Question-answering and drafting over Indian",
     "statutes, judgments and contract clauses.",
     "No cloud API — nothing leaves the machine."],
    "hybrid  =  dense (Chroma) + BM25  ·  fused by RRF",
    [("CORPUS", "121,112 chunks"),
     ("GRAPH", "32k entities"),
     ("MODEL", "Qwen via Ollama")],
)
