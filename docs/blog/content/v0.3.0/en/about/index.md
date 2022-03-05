---
layout: page
title: About
---

{% assign language = "en" %}
{% assign version = "v0.3.0" %}


{%- if site.description -%}
  {{ site.description }}
{%- endif -%}

{% for file in site.static_files %}
  {% if file.path contains '/about/' %}
    {% assign filename = file.path | split: "/" | last %}
    {% include_relative {{ filename }} %}
  {% endif %}
{% endfor %}
