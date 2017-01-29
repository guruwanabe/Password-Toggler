      function PasswordToggler($strSelector, callBack){

          this.strPrefix   = '';
          
          this.strSelector = $strSelector;
          this.strHandler  = 'click';
          this.strIconShow = 'fa fa-eye';
          this.strIconHide = 'fa fa-eye-slash';
          this.strTextShow = 'Show password';
          this.strTextHide = 'Hide password';
          this.strBtnClass = 'btn btn-default';
      }

      PasswordToggler.prototype = {
        blnCreated : false,
        objSelector: null,
        objIcon: null,
        objButton: null,
        init: function(){
          var $objSelector = this.setSelector();
          //Bail early if selector is undefined, null or not a password type input
          if($objSelector.type != 'password' || typeof $objSelector == 'undefined' || typeof $objSelector == null){
             console.log('Error: selector is undefined || null or not of type password');
            return false;
          }else{
            if (this.blnCreated === true) {
              return this;
            }else{
              console.time('htmlApi');
              this.htmlApi();
              console.timeEnd("htmlApiEnd");

              console.time('createMarkup');
              this.createMarkup();
              console.timeEnd("createMarkupEnd");
            }
          }
          //console.log(PasswordToggler.prototype.blnCreated, this.blnCreated);
          
        },
        htmlApi: function(){
          //Cache the selector
          var objSelector = this.setSelector();
          
          if (typeof (objSelector) != 'undefined' || objSelector != null) {
              //Supporting some HTML API
              this.strPrefix   = objSelector.hasAttribute('data-prefix') ? objSelector.getAttribute('data-prefix') : this.strPrefix;
        
              this.strHandler  = objSelector.hasAttribute('data-handler') ? objSelector.getAttribute('data-handler') : this.strHandler;
              this.strIconShow = objSelector.hasAttribute('data-icon-show') ? objSelector.getAttribute('data-icon-show') : this.strIconShow;
              this.strIconHide = objSelector.hasAttribute('data-icon-hide') ? objSelector.getAttribute('data-icon-hide') : this.strIconHide;
              this.strTextShow = objSelector.hasAttribute('data-text-show') ? objSelector.getAttribute('data-text-show') : this.strTextShow;
              this.strTextHide = objSelector.hasAttribute('data-text-hide') ? objSelector.getAttribute('data-text-hide') : this.strTextHide;
              this.strBtnClass = objSelector.hasAttribute('data-button-class') ? objSelector.getAttribute('data-button-class', true) : this.strBtnClass;
          }
          return this;
        },
        createMarkup: function() {
            //reference the selector
            var $objSelector = this.setSelector();
            console.log($objSelector,'asdasd');
            //Create aditional markup
            var objElement = document.createElement('div');
            var objElementChild = document.createElement('span');
            var objButton  = document.createElement('button');
            var objIcon    = document.createElement('i');
            
            if (typeof objElement != 'undefined' && $objSelector != null) {
                //Populate the object
                this.objSelector = $objSelector;
                //Insert into DOM
                this.objSelector.parentNode.insertBefore(objElement, this.objSelector);
                objElement.appendChild(this.objSelector);
                objElement.appendChild(objElementChild);
                objElementChild.appendChild(objButton);
                objButton.appendChild(objIcon);

                //Apply some styles
                objElement.setAttribute('class', this.strPrefix+'input-group');
       
                objElementChild.setAttribute('class', this.strPrefix+'input-group-btn');

                objButton.setAttribute('type', 'button');
                objButton.setAttribute('id', this.strPrefix+'button_'+this.strSelector);
                objButton.setAttribute('class', this.strBtnClass);
                objButton.setAttribute('title', this.strTextShow);

                objIcon.setAttribute('class', this.strIconShow);
                objIcon.setAttribute('aria-hidden', 'true');
                //We have created the layout if we got here
                this.blnCreated = true;
                //populate the object
                this.objIcon = objIcon;
                this.objButton = objButton;
                //adding eventListener
                console.time('addListener');
                this.addListener(this.objSelector, this.strHandler);
                console.timeEnd('addListenerEnd');
            }
            console.log(this, $objSelector, objElement, this.objButton, this.objIcon);
          return this;

        },
        setSelector: function() {
            return document.getElementById(this.strSelector);
        },
        togglePassword: function($element, $blnActive) {
          try{
            if ($element.type === 'password') {
              $element.type = 'text';
              this.objIcon.setAttribute('class', this.strIconHide);
              this.objButton.setAttribute('title', this.strTextHide);
              $blnActive = true;
            } else {
              $element.type = 'password';
              this.objIcon.setAttribute('class', this.strIconShow);
              this.objButton.setAttribute('title', this.strTextShow);
              $blnActive = false;
            }
          }catch(e){
            console.log(e.message)
          }
          return false;
        },
        
        addListener: function($element, $strListener) {
          var self = this;
          var objSelector = document.getElementById(this.strPrefix+'button_'+this.strSelector);
          if(this.blnCreated === true){
            console.time('addEventListener');
            //If the browser supports EventLIstener use it, else fall to attach event (IE)
            if (objSelector.addEventListener) {
              console.log(objSelector.addEventListener);
              objSelector.addEventListener(
              $strListener, function(){ 
                console.time('togglePassword');
                self.togglePassword($element); 
                console.timeEnd('togglePasswordEnd');
              });

               if($strListener === 'mouseover'){
                  objSelector.addEventListener(
                      'mouseout', function(){ 
                        console.time('togglePassword');
                        self.togglePassword($element, false); 
                        console.timeEnd('togglePasswordEnd');
                      }
                  );
               } 
               if($strListener === 'mouseout'){
                  objSelector.addEventListener(
                      'mouseover', function(){ 
                        console.time('togglePassword');
                        self.togglePassword($element, true); 
                        console.timeEnd('togglePasswordEnd');
                      }
                  );
               } 

            }else {
              objSelector.attachEvent($strListener, function(){ 
                console.time('togglePassword');
                self.togglePassword($element); 
                console.timeEnd('togglePasswordEnd');
              });
            }
            console.timeEnd('addEventListenerEnd');
          }
        }
      }
