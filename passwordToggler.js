	function PasswordToggler($strSelector, $options){

		this.strPrefix   = "";

		this.options     = $options;
		this.strSelector = $strSelector;
		this.strHandler  = "click";
		this.strIconShow = "fa fa-eye";
		this.strIconHide = "fa fa-eye-slash";
		this.strTextShow = "Show password";
		this.strTextHide = "Hide password";
		this.strBtnClass = "btn btn-default";

		this.init();
	}

	PasswordToggler.DEFAULTS = {
		strPrefix   : "",
		strHandler  : "click",
		strIconShow : "fa fa-eye",
		strIconHide : "fa fa-eye-slash",
		strTextShow : "Show password",
		strTextHide : "Hide password",
		strBtnClass : "btn btn-default"
	};

	PasswordToggler.prototype = {
		blnCreated : false,
		objSelector: null,
		objIcon: null,
		objButton: null,
		init: function(){
			var $objSelector = this.setSelector();
			//Bail early if selector is undefined or null
			if(typeof $objSelector != "undefined" || $objSelector != null){
				//Bail early if selector not of type password
				if($objSelector.type !== "password" || $objSelector.getAttribute("type") !== "password"){
          //Show some warning in the console
					console.error("Error: selector is not of type password");
					return false;
				}else{
					if (this.blnCreated === true) {
						return this;
					}else{
						//console.time('htmlApi');
						this.htmlApi($objSelector);
						//console.timeEnd("htmlApiEnd");

						//console.time('createMarkup');
						this.createMarkup($objSelector);
						//console.timeEnd("createMarkupEnd");
					}
				}
			}
			return false;
		},
		htmlApi: function($objSelector){
			if (typeof $objSelector != "undefined" || $objSelector != null) {
				//Supporting some HTML API
				this.strPrefix   = $objSelector.hasAttribute("data-prefix") ? $objSelector.getAttribute("data-prefix") : (this.strPrefix ? this.strPrefix : this.options.strPrefix);

				this.strHandler  = $objSelector.hasAttribute("data-handler") ? $objSelector.getAttribute("data-handler") : (this.strHandler ? this.strHandler : this.options.strHandler);
				this.strIconShow = $objSelector.hasAttribute("data-icon-show") ? $objSelector.getAttribute("data-icon-show") : (this.strIconShow ? this.strIconShow : this.options.strIconShow);
				this.strIconHide = $objSelector.hasAttribute("data-icon-hide") ? $objSelector.getAttribute("data-icon-hide") : (this.strIconHide ? this.strIconHide : this.options.strIconHide);
				this.strTextShow = $objSelector.hasAttribute("data-text-show") ? $objSelector.getAttribute("data-text-show") : (this.strTextShow ? this.strTextShow : this.options.strTextShow);
				this.strTextHide = $objSelector.hasAttribute("data-text-hide") ? $objSelector.getAttribute("data-text-hide") : (this.strTextHide ? this.strTextHide : this.options.strTextHide);
				this.strBtnClass = $objSelector.hasAttribute("data-button-class") ? $objSelector.getAttribute("data-button-class") : (this.strBtnClass ? this.strBtnClass : this.options.strBtnClass);
			}
			return this;
		},
		createMarkup: function($objSelector) {
			//Create aditional markup
			var objElement = document.createElement("div");
			var objElementChild = document.createElement("span");
			var objButton  = document.createElement("button");
			var objIcon    = document.createElement("i");

			if (typeof objElement != "undefined" && $objSelector != null) {
				//Insert into DOM
				if(typeof $objSelector.parentNode != "undefined"){
					$objSelector.parentNode.insertBefore(objElement, $objSelector);
					objElement.appendChild($objSelector);
				}else{
					$objSelector.insertBefore(objElement, $objSelector);
					objElement.appendChild($objSelector);
				}

				objElement.appendChild(objElementChild);
				objElementChild.appendChild(objButton);
				objButton.appendChild(objIcon);

				//Apply some styles
				objElement.setAttribute("class", this.strPrefix+"input-group");

				objElementChild.setAttribute("class", this.strPrefix+"input-group-btn");

				objButton.setAttribute("type", "button");
				objButton.setAttribute("class", this.strPrefix+this.strBtnClass);
				objButton.setAttribute("title", this.strTextShow);

				objIcon.setAttribute("class", this.strIconShow);
				objIcon.setAttribute("aria-hidden", "true");
				//We have created the layout if we got here
				this.blnCreated = true;
				//populate the object
				this.objIcon = objIcon;
				this.objButton = objButton;
				//adding eventListener
				//console.time('addListener');
				this.addListener($objSelector, this.strHandler);
				//console.timeEnd('addListenerEnd');
			}
			return this;

		},
		setSelector: function(){
			var $objSelector = this.strSelector;
			if(typeof $objSelector === "object"){
				this.objSelector = $($objSelector);
			}else{
				//Manage plain JS selector
				$objSelector.replace("#", "");
				$objSelector.replace(".", "");
				$objSelector = document.getElementById($objSelector);
				//Convert the selector from jquery object to js object
				this.objSelector = $objSelector[0];
			}
			return $objSelector;
		},
		togglePassword: function($element, $blnActive) {
			try{
				if ($element.type === "password") {
					$element.type = "text";
					this.objIcon.setAttribute("class", this.strIconHide);
					this.objButton.setAttribute("title", this.strTextHide);
					$blnActive = true;
				} else {
					$element.type = "password";
					this.objIcon.setAttribute("class", this.strIconShow);
					this.objButton.setAttribute("title", this.strTextShow);
					$blnActive = false;
				}
			}catch(e){
				console.error(e.message);
			}
			return false;
		},
		addListener: function($element, $strListener) {
			var self = this;
			var objSelector = this.objButton;
			if(this.blnCreated === true){
				//console.time('addEventListener');
				//If the browser supports EventLIstener use it, else fall to attach event (IE)
				if (objSelector.addEventListener) {
					//console.log(objSelector.addEventListener);
					objSelector.addEventListener(
						$strListener, function(){
							//console.time('togglePassword');
								self.togglePassword($element);
							//console.timeEnd('togglePasswordEnd');
						});
				}else{
					objSelector.attachEvent($strListener, function(){
						//console.time('togglePassword');
						self.togglePassword($element);
						//console.timeEnd('togglePasswordEnd');
					});
				}
				return false;
				//console.timeEnd('addEventListenerEnd');
			}
		}
	};

+function ($) {
		'use strict';

	// PasswordToggler Plugin
	// =======================
	function Plugin($option) {
		return this.each(function () {
			var self   = $(this);
			var data    = self.data("passwordToggler");
			var options = $.extend({}, PasswordToggler.DEFAULTS, self.data(), typeof $option == "object" && $option);

			if (!data) {
				self.data("passwordToggler", (data = new PasswordToggler(this, options)));
			}
			if (typeof $option == "string"){
				data[option]($option);
			}
		});
	}

	var old = $.fn.passwordToggler;

	$.fn.passwordToggler             = Plugin;
	$.fn.passwordToggler.Constructor = PasswordToggler;


	// PasswordToggler No Conflict
	// ============================
	$.fn.passwordToggler.noConflict = function () {
		$.fn.passwordToggler = old;
		return this;
	};
}(jQuery);
