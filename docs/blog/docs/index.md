---
layout: document
title: Documentation
---

<!-- Modal -->
<div class="modal fade" id="modalFeaturesSheets" tabindex="-1" aria-labelledby="modalFeaturesSheets" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="modalFeaturesSheets">Sprite Sheets Features</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
		<h3>Current Features:</h3>
		<div style="padding-left:10px;"><p>
			<i class="fas fa-check"></i> Import web-friendly image formats<br>
			<i class="fas fa-check"></i> <em>Extract animated GIF frames!</em><br>
			<i class="fas fa-check"></i> Export images as PNG, GIF, or JPG<br>
			<i class="fas fa-check"></i> Export data as XML or JSON<br>
			<i class="fas fa-check"></i> Export data as CSS<br>
			<i class="fas fa-check"></i> Trim &amp; crop unused pixels<br>
			<i class="fas fa-check"></i> Heuristic mapping (chroma key)<br>
			<i class="fas fa-check"></i> Basic rects (shelf) texture packing<br>
			<i class="fas fa-check"></i> MaxRects texture packing<br>
			<i class="fas fa-check"></i> Alpha (transparent) cleaning (aids compression)<br>
			<i class="fas fa-check"></i> Debug mode (show sprite outlines)
		</p></div>
		<h3>Planned Features:</h3>
		<div style="padding-left:10px;"><p>
			<i class="fas fa-wrench"></i> Import non-web image formats<br>
			<i class="fas fa-wrench"></i> Export optimized images<br>
			<i class="fas fa-wrench"></i> Allow sprite rotate within sheet<br>
			<i class="fas fa-wrench"></i> Alias duplicate sprites<br>
			<i class="fas fa-wrench"></i> DropBox (et. al.) support
		</p></div>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-primary" data-bs-dismiss="modal">Done</button>
      </div>
    </div>
  </div>
</div>


<!-- Modal -->
<div class="modal fade" id="modalFeaturesFonts" tabindex="-1" aria-labelledby="modalFeaturesFonts" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="modalFeaturesFonts">Sprite Fonts Features</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
		<h3>Current Features:</h3>
		<div style="padding-left:10px;"><p>
			<i class="fas fa-check"></i> Select from a library of 2000+ fonts<br>
			<i class="fas fa-check"></i> Export images as PNG, GIF, or JPG<br>
			<i class="fas fa-check"></i> Export data as XML or JSON<br>
			<i class="fas fa-check"></i> Trim &amp; crop unused pixels (smaller files)<br>
			<i class="fas fa-check"></i> Kerning (deduced)<br>
			<i class="fas fa-check"></i> Metrics (deduced)<br>
			<i class="fas fa-check"></i> Specify included characters<br>
			<i class="fas fa-check"></i> Filter included characters from sample text<br>
			<i class="fas fa-check"></i> Debug mode (show font metrics as outlines)
		</p></div>
		<h3>Planned Features:</h3>
		<div style="padding-left:10px;"><p>
			<i class="fas fa-wrench"></i> Import your own TTF/OTF fonts<br>
			<i class="fas fa-wrench"></i> Kerning (inspect font data)<br>
			<i class="fas fa-wrench"></i> Metrics (inspect font data)<br>
			<i class="fas fa-wrench"></i> Embedded bounds data in image (no separate atlas)<br>
			<i class="fas fa-wrench"></i> Export optimized images<br>
			<i class="fas fa-wrench"></i> Alias duplicate glyphs<br>
			<i class="fas fa-wrench"></i> DropBox support
		</p></div>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-primary" data-bs-dismiss="modal">Done</button>
      </div>
    </div>
  </div>
</div>




# Documentation

This page provides an overview of the GameDevUtils.com modules, both planned and released. Each module is represented as a button to view the features of the module, a button to drill down into the detailed documentation, and a short summary of what to expect from the module.

<div class="row docs-nav">

<div class="col-1">&nbsp;</div>
<div class="col-8">
<h2>Sprite Sheets</h2>
<p>A tool to merge several art assets (objects within the game) into a single image, saving memory, reducing CPU-to-GPU chatter, and reducing the time to load your art.</p>
<a href="#modalFeaturesSheets" type="button" type="button" class="btn btn-primary modalFeaturesSheets" data-bs-toggle="modal" data-bs-target="#modalFeaturesSheets">Features</a>
<button type="button" onclick='javascript:goto(this, "sheets/index.html");' class="btn btn-primary">Docs &raquo;</button>
</div>
<div class="col-3">&nbsp;</div>
</div>


<div class="row docs-nav">

<div class="col-1">&nbsp;</div>
<div class="col-8">
<h2>Sprite Fonts</h2>
<p>A tool to convert public domain TTF & OTF fonts into bitmap fonts - a format that is more easily consumed by game engines. Includes functions to place, align, and scale. If the easy way I'm considering doesn't work as planed, I'll work at the font level.</p>
<a href="#modalFeaturesFonts" type="button" type="button" class="btn btn-primary modalFeaturesFonts" data-bs-toggle="modal" data-bs-target="#modalFeaturesFonts">Features</a>
<button type="button" onclick='javascript:goto(this, "fonts/index.html");' class="btn btn-primary disabled">Docs &raquo;</button></div>
<div class="col-3">&nbsp;</div>
</div>

<div class="row docs-nav">

<div class="col-4"><h2>Edit Tiles</h2><a href="#popupFeatureTiles" role="button" data-toggle="modal" class="btn btn-primary popupFeatureTiles disabled">Features</a>
<button type="button" onclick='javascript:goto(this, "tiles/index.html");' class="btn btn-primary disabled">Docs &raquo;</button></div>
<div class="col-6">
A tool that manages the placement of a fixed
set of tiled images. By painting these tiles
into place, entire game worlds can be made. 
Tiles can be assigned free-form metadata. Inspired by editors such as <a href="https://www.mapeditor.org/">Tiled</a>.</div>
<div class="col-2"></div>
</div>

<div class="row docs-nav">
<div class="col-4"><h2>Animation</h2><a href="#popupFeatureAnimation" role="button" data-toggle="modal" class="btn btn-primary popupFeatureAnimation disabled">Features</a>
<button type="button" onclick='javascript:goto(this, "animation/index.html");' class="btn btn-primary disabled">Docs &raquo;</button></div>
<div class="col-6">
A tool to assemble sprites into frame-based or bones-based animation sequences. Future version to include UV deformation. 
This module has been in large part inspired by apps like <a href="https://dragonbones.github.io/en/index.html">DragonBones</a> and <a href="http://en.esotericsoftware.com/">Spine</a>.</div>
<div class="col-2"></div>
</div>

<div class="row docs-nav">
<div class="col-4"><h2>Effects</h2><a href="#popupFeatureEffects" role="button" data-toggle="modal" class="btn btn-primary popupFeatureEffects disabled">Features</a>
<button type="button" onclick='javascript:goto(this, "effects/index.html");' class="btn btn-primary disabled">Docs &raquo;</button></div>
<div class="col-6">
A tool to create visual effects as parametrized animations that can be placed in the game world and have their playback tweaked at run-time. Inspired by my 2007 game programming book's chapter on particle effects, and features from other effects tools (like using normal maps on 2D assets).</div>
<div class="col-2"></div>
</div>
