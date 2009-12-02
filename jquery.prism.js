/*
 * jQuery Prism 1.0
 * http://github.com/koteako/prism
 *
 * Copyright (c) 2009 Koteako LLC
 * Dual licensed under the MIT and GPL licenses.
 */
jQuery.fn.prism = function(options) {

  // Default settings
  var settings = jQuery.extend({
    hue: 24,
    saturation: 0.93,
    value: 240,
    interval: 400,
    step: 0.25,
    property: "background-color",
    shuffle: true
  }, options);


  var handle;
  var rgb = {'R':0, 'G':0, 'B':0};
  var hsv = {'H':0, 'S':0, 'V':0};

  // Some basic error checking
  function SetHsv(hue, saturation, value)
  {
    hsv.H = (hue >= 0 && hue < 360) ? hue : 0;
    hsv.S = (saturation >= 0 && saturation <= 1) ? saturation : 1;
    hsv.V = (value >= 0 && value <= 255) ? value : 255;
  }

  // Convert from HSV color representation to RBG
  function GenerateRgb()
  {  
    var x = Math.floor(hsv.H/60);
    var f = hsv.H/60 - x;
    
    var p = Math.round(hsv.V*(1-hsv.S));
    var q = Math.round(hsv.V*(1-f*hsv.S));
    var t = Math.round(hsv.V*(1-(1-f)*hsv.S));
    
    switch (x)
    {
      case 0: rgb.R=hsv.V,rgb.G=t,rgb.B=p; break;
      case 1: rgb.R=q,rgb.G=hsv.V,rgb.B=p; break;
      case 2: rgb.R=p,rgb.G=hsv.V,rgb.B=t; break;
      case 3: rgb.R=p,rgb.G=q,rgb.B=hsv.V; break;
      case 4: rgb.R=t,rgb.G=p,rgb.B=hsv.V; break;
      case 5: rgb.R=hsv.V,rgb.G=p,rgb.B=q; break;
    }
  }
  
  
  function ShuffleColor()
  {
    hsv.H = Math.round(Math.random()*360);
    ChangeColor();
  }

  
  function ChangeColor()
  {
    if (hsv.H >= 360) hsv.H = 0;
    else hsv.H += settings.step;
    
    GenerateRgb();
    
    handle.css(settings.property, "rgb("+rgb.R+","+rgb.G+","+rgb.B+")");
  }


  // Do this for every selected element
  this.each(function() {

    // Store element selector to use in our functions
    handle = $(this);

    // Load a default color
    SetHsv(settings.hue, settings.saturation, settings.value);

    // Set a random color on mouseover
    if (settings.shuffle)
      $(this).mouseover(ShuffleColor);

    // Rotate colors
    setInterval(ChangeColor, settings.interval);

  });
};
