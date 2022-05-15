{%- capture path -%}{% include l10n-path.md path=include.path blurb=include.blurb %}{%- endcapture -%}
{%- capture text -%}{% include {{ path }} %}{%- endcapture -%}

{{ text }}