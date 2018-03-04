sap.ui.define([
		"sap/ui/core/mvc/Controller",
		"sap/ui/core/routing/History",
		"sap/ui/model/json/JSONModel",
		"sap/m/MessageToast",
		"sap/m/MessageBox"
	], function (Controller, History, JSONModel, MessageToast, MessageBox) {
		"use strict";

		return Controller.extend("leverx.app.controller.ProductDetails", {
		onInit: function () {
				var oComponent = this.getOwnerComponent();
				var oRouter = oComponent.getRouter();
				oRouter.getRoute("productDetails").attachPatternMatched(this.onPatternMatched, this);
				var timeNow = new Date().toISOString();
<<<<<<< HEAD
				var mComment = new JSONModel({
					comment: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam nec purus vel nunc elementum aliquam.",
					author: "Some Author",
					createdDate: timeNow,
					rating: 5,
				});
				this.getView().setModel(mComment,"oComment");
			},
			onPost:function(oEvent){
				var oODataModel = this.getView().getModel("odata");
				var sValue = oEvent.getParameter("value");
				var oComment = this.getView().getModel("oComment").getData();
				oComment.comment = sValue;
				var oCtx = oEvent.getSource().getBindingContext("odata");
				var sPath = `${oCtx.getPath()}/comments`;
				console.log(oCtx);

				oODataModel.create(sPath, oComment, {
					success: function () {
						MessageToast.show("Comment was successfully created!")
					},
					error: function () {
						MessageBox.error("Error while creating comment!");
					}
				});
			},
			formatComment: function(author,comment) {
				return author + ": " + comment;
=======
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
				
>>>>>>> 08e0d1f7b5c46dbfc502e5d3898c5cf881174396
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
