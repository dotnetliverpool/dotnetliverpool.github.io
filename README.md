# Dot Net Liverpool Website built using Helium Jekyll
## A new Bootstrap 4 theme

## The forked project is no longer maintained

<a href="https://jekyll-themes.com">
    <img src="https://img.shields.io/badge/featured%20on-JT-red.svg" height="20" alt="Jekyll Themes Shield" >
</a>

Helium is a fast, modern, and configurable [Jekyll](http://jekyllrb.com/) theme with some tricks up it's sleeve. It has a live theme switcher and it's main blog layout display prominent hero images for posts with colored overlays and nice animations.

[Bootstrap theme source](https://uideck.com/products/helium-ui-kit/)

![Dot Net Liverpool sample](https://github.com/dotnetliverpool/dotnetliverpool.github.io/blob/master/assets/images/website.JPG?raw=true)

## Features
Though minimalistic-looking by nature, dactl is easily configurable and includes quite a lot of niceties:

Main features:
* [Bootstrap 4](https://v4-alpha.getbootstrap.com/)
* [Font Awesome](http://fontawesome.io/)
* 100+ UI Blocks
* Responsive design

Jekyll-specific features:
* Fully compatible with Jekyll 3.x and GitHub Pages
* SEO optimized
* [Google Analytics](https://www.google.com/analytics/) support
* [Google AdSense](https://www.google.com/adsense/start/) support
* [Disqus](https://disqus.com/) comments support

Other features:
* Blog page
* Landing page samples
* Tags functionality and tags pages
* Link posts functionality
* Mobile slider scrolling
* Emoji support ⚡️⚡️⚡️ by copy paste from [getemoji](http://getemoji.com/)

Some of the features listed above can be easily configured or disabled by you.

## Information about Helium
At it's core, dactl is a forked version of [sentenza](https://github.com/sentenza/jekyll-material-design) but it has been almost entirely rewritten from scratch.  
I have just started my journey in the world of web development, learning new things on the way.  
Looking for a way to put my newly acquired skills to test I found Jekyll and I quickly realized that it's going to be a good learning experience since I don't like building 'dummy' projects.  
I've built this theme as a way to develop my skills further.

You can find credits at the bottom of this Readme file.  
**All** feedback is welcome, both positive and negative.

## Installation
### Running locally
Assuming you've got Jekyll [installed](https://jekyllrb.com/docs/installation/), clone or download this repo, `cd` into the folder and run `jekyll serve`.

### Hosting on GitHub
Fork this repo and rename it to `yourusername.github.io`... and edit the `_config.yaml` file whit your github address and your links (such as social media username, email, name, ecc.)!  
Your new helium-themed Jekyll blog should be up and running at yourusername.github.io.  

## Additional information about some features
### Hero images and blog layout
Liquid 'script' which is used to append correct hero image and overlay color as set in post YAML Front matter was written by me and while it's really basic it functions properly.  
You can read more about it and see the code in `include/utils/hero.html`.

#### Tags & Tags Pages
Tags and tag pages are supported by using Jekyll's native collections functionality.  

## License
All parts of helium Jekyll theme are free to use and abuse under the open-source [MIT license](http://opensource.org/licenses/mit-license.php).
