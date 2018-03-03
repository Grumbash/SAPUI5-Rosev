sap.ui.define([
		"sap/ui/core/mvc/Controller",
		"sap/ui/core/routing/History"
	], function (Controller, History) {
		"use strict";

		return Controller.extend("leverx.app.controller.ProductDetails", {
		onInit: function () {
				var oComponent = this.getOwnerComponent();
				var oRouter = oComponent.getRouter();
				oRouter.getRoute("productDetails").attachPatternMatched(this.onPatternMatched, this);
				var timeNow = new Date().toISOString();
				var mComment = new JSONModel(
					{
						comment: "",
						author: "",
						createdDate: timeNow,
						rating: 0,
					});
				this.getView().setModel(mComment,"newComment");
			},
			onPost:function(oEnvent){
				
			},
			onPatternMatched: function (oEvent) {
				var that = this;
				var mRouteArguments = oEvent.getParameter("arguments");
				var sObjectId = mRouteArguments.productId;
				var oODataModel = this.getView().getModel("odata");
				oODataModel.metadataLoaded().then(function () {
					var sKey = oODataModel.createKey("/OrderProducts", {id: sObjectId});
					that.getView().bindObject({
						path: sKey,
						model: "odata"
					});
				});
			},
			onProductNavBack: function () {
				var oHistory = History.getInstance();
				var sPreviousHash = oHistory.getPreviousHash();

				if (sPreviousHash !== undefined) {
					window.history.go(-1);
				} else {
					var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
					oRouter.navTo("OrderDetails", {}, true);
				}
			}
		});
	}
);
