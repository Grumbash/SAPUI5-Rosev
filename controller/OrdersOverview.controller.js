sap.ui.define([
		"sap/ui/core/mvc/Controller",
	], function (Controller) {
		"use strict";

		return Controller.extend("leverx.app.controller.OrdersOverview", {

			onMyButtonPress: function(oEvent) {
				var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
				oRouter.navTo("orderDetails");
			}
		});
	}
);
