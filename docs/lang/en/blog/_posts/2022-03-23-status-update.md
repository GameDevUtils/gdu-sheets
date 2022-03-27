---
layout: post
title: "Status Update"
---

I've created the three proof-of-concept projects for the sheets app. Then I got off on a strange tangent involving localization of the website content, then localization and versioning of the documentation. 

## Small Pains

We're using [Jekyll](https://jekyllrb.com/) to drive the blog and documentation. The plan was to use out-of-the-box features, but a decent amount of custom JavaScript was required. For example, Jekyll's scripting exposes a 404 with a `page.url` of `/404.html`, so it's hard to determine the intended destination. But some script on the client that references `window.location.href` easily finds the target. Then, it's a simple matter to swap language codes to redirect the reader to the translated page.

{% include blurb/lang/en/closing.md %}