{%- capture code -%}{% include l10n-code.md %}{%- endcapture -%}
{%- assign path="blurb/lang/" + code + "/not-found.md" -%}

{%- if include.path -%}
  {%- assign path = include.path | replace: "/xx/", code -%}
{%- else include.blurb -%}
  {%- assign path = "blurb/lang/xx/" | append: include.blurb | replace: "/xx/", code -%}
{%- endif -%}

{{ path }}