# Rakugaki 2016

## Introduction

This project is my design portfolio - [Rakugaki](http://rakugaki.me).

* Original version: built with jQuery and PHP (only to concatenate partials). [repo](https://github.com/artchen/Rakugaki)
* Version 2: transited to use Angular.js together with jQuery. [repo](https://github.com/artchen/Rakugaki-2)
* This version: started using [gulp](http://gulpjs.com/) to organize the project.

## Install

```bash
git clone https://github.com/artchen/Rakugaki-2016.git
cd ./Rakugaki-2016
npm install
bower install
```

## Build

Build all components.

```bash
gulp guild			# or just use gulp
```

Build individual components.

```bash
gulp less				# compile, minify and package less files to style.css
gulp js					# uglify and package js files to js/app.js
gulp angular		# uglify and package angularjs dependencies to js/ang.js
gulp jquery			# uglify and package jquery dependencies to js/jq.js
gulp html				# minify and copy markups
gulp img				# minify and copy images
gulp icomoon		# copy icons
```
