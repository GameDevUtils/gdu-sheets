{%- assign language = include.code | default: "en" -%}
{%- assign language = "/" | append: language | append: "/" -%}

{%- comment -%}
WHEN CODE IS NOT SPECIFIED, DETECT IT
{%- endcomment -%}

{%- unless include.code -%}
  {%- assign language_list = "/en/,/es/,/fr/,/ja/,/cz/,/ko/,/hi/" -%}
  {%- assign languages = language_list | split: "," -%}
  {%- for lang in languages -%}
    {%- assign code = "/lang" | append: lang -%}
    {%- if page.url contains code -%}
      {%- assign language = lang -%}
      {%- break -%}
    {%- endif -%}
  {%- endfor -%}
{%- endunless -%}

{{ language }}