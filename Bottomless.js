/*
 * Bottomless Web Page Example
 *
 * Create a web page with endless colored circles.
 */
 
    var content = document.getElementById("main"),
        oldPagePosition = 0;
       
/*
 * HTML document fragment helper functions
 */
    function createBox(aClass, color)
    {
      var anode = document.createElement("div");      
      anode.className = aClass + " " + color;      
      return anode;
    }

/*
 * Initialize the page:
 *
 * - create one large document fragment and add the fragment to the
 *   page after it's finished
 */
 
    function createColorBoxes(container)
    {
        var frag = document.createDocumentFragment(),
            colors = ["red", "orange", "yellow", "green", "blue", "indigo", "purple"],
            i, icount,
            icolor = 0,
            colorTotal = colors.length,
            N = 7,
            superCount = 0;
       
        for ( i = 0; i < N; i++ )  // N different sets of the colored shapes
        {         
            for ( icount = 0; icount < colorTotal; icount++ )
            {
                frag.appendChild( createBox("boxer", colors[icolor]) );

                icolor++;
            
                if ( icolor >= colorTotal )
                {
                    icolor = 0;
                }
            
                superCount++;
            
                if (superCount >= (N * colorTotal) )
                {
                    break;
                }
            }
        }

        container.appendChild(frag);
    };

    createColorBoxes(content);
   
    var scrollHandler = function()
    {
        var content = document.getElementById("main"),
            pageHt = window.innerHeight,
            contentHt = document.body.scrollHeight,
            vScroll = document.body.scrollTop,
            deltaY;

        if (vScroll === 0)
        {
            vScroll = document.documentElement.scrollTop;
        }

        // distance from the bottom of the page within 10 pixels
        deltaY = contentHt - pageHt - 20;
      
        // scrolled within range of the bottom to trigger another content load
        if ( vScroll > deltaY )  
        {
            // help minimize multiple content loadings
            if ( vScroll !== oldPagePosition )  
            {
                // simulate a delay getting server data via AJAX
                setTimeout( function()  
                {
                    createColorBoxes(content);
                }, 500);
                
                //alert( "old/new: " + oldPagePosition + "/" + vScroll );
                oldPagePosition = vScroll;
            }
        }
    };
   
    var scrollTimer;
         
    document.addEventListener("scroll", 
        function() 
        {
            // limit scroll listener so it doesn't fire too often
            if (scrollTimer) 
            {
                window.clearTimeout(scrollTimer);
            }
         
            scrollTimer = window.setTimeout(scrollHandler, 500);
        }
    );
