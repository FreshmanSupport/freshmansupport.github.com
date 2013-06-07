$(document).ready(on_ready);
function on_ready() {
    $('#search').defaultVal('Choose a School');
    $('#comment').defaultVal('your comment here...');
    $('#message').defaultVal('your message here...');
    
    enable_smooth_scroll();
    
    if (typeof sh_highlightDocument == "function") {
        sh_highlightDocument();
    }
    
    if (typeof _gaq !== 'undefined') {
        _gaq.push(['_trackEvent', 'Browser Dimensions', 'load', 'width', $(window).width()]);
        _gaq.push(['_trackEvent', 'Browser Dimensions', 'load', 'height', $(window).height()]);
    }
    
    $(window).resize(function () {
        if ($(this).data('gatimer')) {
            clearTimeout($(this).data('gatimer'));
            $(this).data('gatimer', null);
        }

        $(this).data(
            'gatimer',
            setTimeout(
                function () {
                    if (typeof _gaq !== 'undefined') {
                        _gaq.push(['_trackEvent', 'Browser Dimensions', 'resize', 'width', $(window).width()]);
                        _gaq.push(['_trackEvent', 'Browser Dimensions', 'resize', 'height', $(window).height()]);
                    }
                },
                500
            )
        );
    });
    
    $(window).bind('scroll', function () {
        if ($(this).scrollTop() > $('#footerCenter').offset().top - $(window).height() - 60) {
            if ($('#earthMoonLink').hasClass('more')) {
                $('#earthMoonLink').removeClass('more').text('earth').attr({href: '#Earth', title: 'Back to Top'});
            }

        } else {
            if (!$('#earthMoonLink').hasClass('more')) {
                $('#earthMoonLink').addClass('more').text('moon').attr({href: '#Moon', title: 'Jump to Footer'});
            }
        }
    });
}


function LOG(msg) {
    try {
        if (console) {
            console.log(msg);
        }
        
    } catch(err) {}
}



(function ($) {
    // Monkey patch jQuery 1.3.1+ css() method to support CSS 'transform'
    // property uniformly across Webkit/Safari/Chrome, Firefox 3.5+, and IE 9+.
    // 2009-2011 Zachary Johnson www.zachstronaut.com
    // Updated 2011.05.04 (May the fourth be with you!)
    function getTransformProperty(element)
    {
        // Try transform first for forward compatibility
        // In some versions of IE9, it is critical for msTransform to be in
        // this list before MozTranform.
        var properties = ['transform', 'WebkitTransform', 'msTransform', 'MozTransform', 'OTransform'];
        var p;
        while (p = properties.shift())
        {
            if (typeof element.style[p] != 'undefined')
            {
                return p;
            }
        }
        
        // Default to transform also
        return 'transform';
    }
    
    var _propsObj = null;
    
    var proxied = $.fn.css;
    $.fn.css = function (arg, val)
    {
        // Temporary solution for current 1.6.x incompatibility, while
        // preserving 1.3.x compatibility, until I can rewrite using CSS Hooks
        if (_propsObj === null)
        {
            if (typeof $.cssProps != 'undefined')
            {
                _propsObj = $.cssProps;
            }
            else if (typeof $.props != 'undefined')
            {
                _propsObj = $.props;
            }
            else
            {
                _propsObj = {}
            }
        }
        
        // Find the correct browser specific property and setup the mapping using
        // $.props which is used internally by jQuery.attr() when setting CSS
        // properties via either the css(name, value) or css(properties) method.
        // The problem with doing this once outside of css() method is that you
        // need a DOM node to find the right CSS property, and there is some risk
        // that somebody would call the css() method before body has loaded or any
        // DOM-is-ready events have fired.
        if
        (
            typeof _propsObj['transform'] == 'undefined'
            &&
            (
                arg == 'transform'
                ||
                (
                    typeof arg == 'object'
                    && typeof arg['transform'] != 'undefined'
                )
            )
        )
        {
            _propsObj['transform'] = getTransformProperty(this.get(0));
        }
        
        // We force the property mapping here because jQuery.attr() does
        // property mapping with jQuery.props when setting a CSS property,
        // but curCSS() does *not* do property mapping when *getting* a
        // CSS property.  (It probably should since it manually does it
        // for 'float' now anyway... but that'd require more testing.)
        //
        // But, only do the forced mapping if the correct CSS property
        // is not 'transform' and is something else.
        if (_propsObj['transform'] != 'transform')
        {
            // Call in form of css('transform' ...)
            if (arg == 'transform')
            {
                arg = _propsObj['transform'];
                
                // User wants to GET the transform CSS, and in jQuery 1.4.3
                // calls to css() for transforms return a matrix rather than
                // the actual string specified by the user... avoid that
                // behavior and return the string by calling jQuery.style()
                // directly
                if (typeof val == 'undefined' && jQuery.style)
                {
                    return jQuery.style(this.get(0), arg);
                }
            }

            // Call in form of css({'transform': ...})
            else if
            (
                typeof arg == 'object'
                && typeof arg['transform'] != 'undefined'
            )
            {
                arg[_propsObj['transform']] = arg['transform'];
                delete arg['transform'];
            }
        }
        
        return proxied.apply(this, arguments);
    };
})(jQuery);


/*!
/**
 * Monkey patch jQuery 1.3.1+ to add support for setting or animating CSS
 * scale and rotation independently.
 * https://github.com/zachstronaut/jquery-animate-css-rotate-scale
 * Released under dual MIT/GPL license just like jQuery.
 * 2009-2012 Zachary Johnson www.zachstronaut.com
 */
(function ($) {
    // Updated 2010.11.06
    // Updated 2012.10.13 - Firefox 16 transform style returns a matrix rather than a string of transform functions.  This broke the features of this jQuery patch in Firefox 16.  It should be possible to parse the matrix for both scale and rotate (especially when scale is the same for both the X and Y axis), however the matrix does have disadvantages such as using its own units and also 45deg being indistinguishable from 45+360deg.  To get around these issues, this patch tracks internally the scale, rotation, and rotation units for any elements that are .scale()'ed, .rotate()'ed, or animated.  The major consequences of this are that 1. the scaled/rotated element will blow away any other transform rules applied to the same element (such as skew or translate), and 2. the scaled/rotated element is unaware of any preset scale or rotation initally set by page CSS rules.  You will have to explicitly set the starting scale/rotation value.
    
    function initData($el) {
        var _ARS_data = $el.data('_ARS_data');
        if (!_ARS_data) {
            _ARS_data = {
                rotateUnits: 'deg',
                scale: 1,
                rotate: 0
            };
            
            $el.data('_ARS_data', _ARS_data);
        }
        
        return _ARS_data;
    }
    
    function setTransform($el, data) {
        $el.css('transform', 'rotate(' + data.rotate + data.rotateUnits + ') scale(' + data.scale + ',' + data.scale + ')');
    }
    
    $.fn.rotate = function (val) {
        var $self = $(this), m, data = initData($self);
                        
        if (typeof val == 'undefined') {
            return data.rotate + data.rotateUnits;
        }
        
        m = val.toString().match(/^(-?\d+(\.\d+)?)(.+)?$/);
        if (m) {
            if (m[3]) {
                data.rotateUnits = m[3];
            }
            
            data.rotate = m[1];
            
            setTransform($self, data);
        }
        
        return this;
    };
    
    // Note that scale is unitless.
    $.fn.scale = function (val) {
        var $self = $(this), data = initData($self);
        
        if (typeof val == 'undefined') {
            return data.scale;
        }
        
        data.scale = val;
        
        setTransform($self, data);
        
        return this;
    };

    // fx.cur() must be monkey patched because otherwise it would always
    // return 0 for current rotate and scale values
    var curProxied = $.fx.prototype.cur;
    $.fx.prototype.cur = function () {
        if (this.prop == 'rotate') {
            return parseFloat($(this.elem).rotate());
            
        } else if (this.prop == 'scale') {
            return parseFloat($(this.elem).scale());
        }
        
        return curProxied.apply(this, arguments);
    };
    
    $.fx.step.rotate = function (fx) {
        var data = initData($(fx.elem));
        $(fx.elem).rotate(fx.now + data.rotateUnits);
    };
    
    $.fx.step.scale = function (fx) {
        $(fx.elem).scale(fx.now);
    };
    
    /*
    
    Starting on line 3905 of jquery-1.3.2.js we have this code:
    
    // We need to compute starting value
    if ( unit != "px" ) {
        self.style[ name ] = (end || 1) + unit;
        start = ((end || 1) / e.cur(true)) * start;
        self.style[ name ] = start + unit;
    }
    
    This creates a problem where we cannot give units to our custom animation
    because if we do then this code will execute and because self.style[name]
    does not exist where name is our custom animation's name then e.cur(true)
    will likely return zero and create a divide by zero bug which will set
    start to NaN.
    
    The following monkey patch for animate() gets around this by storing the
    units used in the rotation definition and then stripping the units off.
    
    */
    
    var animateProxied = $.fn.animate;
    $.fn.animate = function (prop) {
        if (typeof prop['rotate'] != 'undefined') {
            var $self, data, m = prop['rotate'].toString().match(/^(([+-]=)?(-?\d+(\.\d+)?))(.+)?$/);
            if (m && m[5]) {
                $self = $(this);
                data = initData($self);
                data.rotateUnits = m[5];
            }
            
            prop['rotate'] = m[1];
        }
        
        return animateProxied.apply(this, arguments);
    };
})(jQuery);



// http://www.learningjquery.com/2007/10/improved-animated-scrolling-script-for-same-page-links
// major changes by Paul Armstrong and Zachary Johnson
function enable_smooth_scroll() {
    function filterPath(string) {
        return string
                .replace(/^\//,'')
                .replace(/(index|default).[a-zA-Z]{3,4}$/,'')
                .replace(/\/$/,'');
    }

    var locationPath = filterPath(location.pathname);

    var scrollElement = 'html, body';
    $('html, body').each(function () {
        var initScrollTop = $(this).attr('scrollTop');
        $(this).attr('scrollTop', initScrollTop + 1);
        if ($(this).attr('scrollTop') == initScrollTop + 1) {
            scrollElement = this.nodeName.toLowerCase();
            $(this).attr('scrollTop', initScrollTop);
            return false;
        }    
    });
    
    $('a[href*=#]').each(function() {
        var thisPath = filterPath(this.pathname) || locationPath;
        if  (   locationPath == thisPath
                && (location.hostname == this.hostname || !this.hostname)
                && this.hash.replace(/#/, '')
            ) {
                if ($(this.hash).length) {
                    $(this).click(function(event) {
                        var targetOffset = $(this.hash).offset().top;
                        var target = this.hash;
                        event.preventDefault();
                        $(scrollElement).animate({scrollTop: targetOffset}, 500, function() {
                            location.hash = target;
                        });
                    });
                }
        }
    });
}


/**
 * jQuery Default Value Plugin v1.0
 * Progressive enhancement technique for inital input field values
 *
 * The MIT License
 * 
 * Copyright (c) 2007 Paul Campbell (pauljamescampbell.co.uk)
 * 
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 * 
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * Improvements by Zachary Johnson 2009
 */
(function($) {
	$.fn.defaultVal = function() {
		// Scope
		var elements = this;
		var args = arguments;
		var c = 0;
		
		return (
            elements.each(function() {
				var el = $(this);
				var value = args[c++];

                if (el.val() == '') {
                    el.val(value);
                }
                
				el.focus(function() {
					if(el.val() == value) {
						el.val('');
					}
					
					el.blur(function() {
    					if(el.val() == '') {
    						el.val(value);
    					}
    				});
				});
			})
    	);
    };
})(jQuery);


/*! Copyright (c) 2010 Brandon Aaron (http://brandonaaron.net)
 * Licensed under the MIT License (LICENSE.txt).
 */
(function($) {
    // backgroundPosition[X,Y] get hooks
    var $div = $('<div style="background-position: 3px 5px">');
    $.support.backgroundPosition   = $div.css('backgroundPosition')  === "3px 5px" ? true : false;
    $.support.backgroundPositionXY = $div.css('backgroundPositionX') === "3px" ? true : false;
    $div = null;

    var xy = ["X","Y"];

    // helper function to parse out the X and Y values from backgroundPosition
    function parseBgPos(bgPos) {
        var parts  = bgPos.split(/\s/),
            values = {
                "X": parts[0],
                "Y": parts[1]
            };
        return values;
    }

    if (!$.support.backgroundPosition && $.support.backgroundPositionXY) {
        $.cssHooks.backgroundPosition = {
            get: function( elem, computed, extra ) {
                return $.map(xy, function( l, i ) {
                    return $.css(elem, "backgroundPosition" + l);
                }).join(" ");
            },
            set: function( elem, value ) {
                $.each(xy, function( i, l ) {
                    var values = parseBgPos(value);
                    elem.style[ "backgroundPosition" + l ] = values[ l ];
                });
            }
        };
    }

    if ($.support.backgroundPosition && !$.support.backgroundPositionXY) {
        $.each(xy, function( i, l ) {
            $.cssHooks[ "backgroundPosition" + l ] = {
                get: function( elem, computed, extra ) {
                    var values = parseBgPos( $.css(elem, "backgroundPosition") );
                    return values[ l ];
                },
                set: function( elem, value ) {
                    var values = parseBgPos( $.css(elem, "backgroundPosition") ),
                        isX = l === "X";
                    elem.style.backgroundPosition = (isX ? value : values[ "X" ]) + " " + 
                                                    (isX ? values[ "Y" ] : value);
                }
            };
            $.fx.step[ "backgroundPosition" + l ] = function( fx ) {
                $.cssHooks[ "backgroundPosition" + l ].set( fx.elem, fx.now + fx.unit );
            };
        });
    }
})(jQuery);


/* http://jquery.thewikies.com/swfobject/ */
/* jquery.swfobject.license.txt */
(function(A){A.flashPlayerVersion=function(){var D,B=null,I=false,H="ShockwaveFlash.ShockwaveFlash";if(!(D=navigator.plugins["Shockwave Flash"])){try{B=new ActiveXObject(H+".7")}catch(G){try{B=new ActiveXObject(H+".6");D=[6,0,21];B.AllowScriptAccess="always"}catch(F){if(D&&D[0]===6){I=true}}if(!I){try{B=new ActiveXObject(H)}catch(E){D="X 0,0,0"}}}if(!I&&B){try{D=B.GetVariable("$version")}catch(C){}}}else{D=D.description}D=D.match(/^[A-Za-z\s]*?(\d+)(\.|,)(\d+)(\s+r|,)(\d+)/);return[D[1]*1,D[3]*1,D[5]*1]}();A.flashExpressInstaller="expressInstall.swf";A.hasFlashPlayer=(A.flashPlayerVersion[0]!==0);A.hasFlashPlayerVersion=function(C){var B=A.flashPlayerVersion;C=(/string|integer/.test(typeof C))?C.toString().split("."):C;return(C)?(B[0]>=(C.major||C[0]||B[0])&&B[1]>=(C.minor||C[1]||B[1])&&B[2]>=(C.release||C[2]||B[2])):(B[0]!==0)};A.flash=function(M){if(!A.hasFlashPlayer){return false}var C=M.swf||"",K=M.params||{},E=document.createElement("body"),B,L,H,D,J,I,G,F;M.height=M.height||180;M.width=M.width||320;if(M.hasVersion&&!A.hasFlashPlayerVersion(M.hasVersion)){A.extend(M,{id:"SWFObjectExprInst",height:Math.max(M.height,137),width:Math.max(M.width,214)});C=M.expressInstaller||A.flashExpressInstaller;K={flashvars:{MMredirectURL:window.location.href,MMplayerType:(A.browser.msie&&A.browser.win)?"ActiveX":"PlugIn",MMdoctitle:document.title.slice(0,47)+" - Flash Player Installation"}}}if(M.flashvars&&typeof K==="object"){A.extend(K,{flashvars:M.flashvars})}for(J in (I=["swf","expressInstall","hasVersion","params","flashvars"])){delete M[I[J]]}B=[];for(J in M){if(typeof M[J]==="object"){L=[];for(I in M[J]){L.push(I.replace(/([A-Z])/,"-$1").toLowerCase()+":"+M[J][I]+";")}M[J]=L.join("")}B.push(J+'="'+M[J]+'"')}M=B.join(" ");if(typeof K==="object"){B=[];for(J in K){if(typeof K[J]==="object"){L=[];for(I in K[J]){if(typeof K[J][I]==="object"){H=[];for(G in K[J][I]){if(typeof K[J][I][G]==="object"){D=[];for(F in K[J][I][G]){D.push(F.replace(/([A-Z])/,"-$1").toLowerCase()+":"+K[J][I][G][F]+";")}K[J][I][G]=D.join("")}H.push(G+"{"+K[J][I][G]+"}")}K[J][I]=H.join("")}L.push(window.escape(I)+"="+window.escape(K[J][I]))}K[J]=L.join("&amp;")}B.push('<PARAM NAME="'+J+'" VALUE="'+K[J]+'">')}K=B.join("")}if(!(/style=/.test(M))){M+=' style="vertical-align:text-top;"'}if(!(/style=(.*?)vertical-align/.test(M))){M=M.replace(/style="/,'style="vertical-align:text-top;')}if(A.browser.msie){M+=' classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"';K='<PARAM NAME="movie" VALUE="'+C+'">'+K}else{M+=' type="application/x-shockwave-flash" data="'+C+'"'}E.innerHTML="<OBJECT "+M+">"+K+"</OBJECT>";return A(E.firstChild)};A.fn.flash=function(C){if(!A.hasFlashPlayer){return this}var B=0,D;while((D=this.eq(B++))[0]){D.html(A.flash(A.extend({},C)));if(D[0].firstChild.getAttribute("id")==="SWFObjectExprInst"){B=this.length}}return this}}(jQuery));
