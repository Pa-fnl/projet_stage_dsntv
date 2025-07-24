(self["webpackChunk"] = self["webpackChunk"] || []).push([["account_history"],{

/***/ "./assets/js/account_history.js":
/*!**************************************!*\
  !*** ./assets/js/account_history.js ***!
  \**************************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

__webpack_require__(/*! core-js/modules/es.array.for-each.js */ "./node_modules/core-js/modules/es.array.for-each.js");
__webpack_require__(/*! core-js/modules/es.object.to-string.js */ "./node_modules/core-js/modules/es.object.to-string.js");
__webpack_require__(/*! core-js/modules/es.promise.js */ "./node_modules/core-js/modules/es.promise.js");
__webpack_require__(/*! core-js/modules/esnext.iterator.constructor.js */ "./node_modules/core-js/modules/esnext.iterator.constructor.js");
__webpack_require__(/*! core-js/modules/esnext.iterator.for-each.js */ "./node_modules/core-js/modules/esnext.iterator.for-each.js");
__webpack_require__(/*! core-js/modules/web.dom-collections.for-each.js */ "./node_modules/core-js/modules/web.dom-collections.for-each.js");
document.addEventListener("DOMContentLoaded", function () {
  // Gestion du bouton "Vider l'historique"
  var clearBtn = document.getElementById("clearHistoryBtn");
  if (clearBtn) {
    clearBtn.addEventListener("click", function () {
      if (confirm("Êtes-vous sûr de vouloir vider votre historique ?")) {
        fetch("/history/clear", {
          // ou utilise path('app_history_clear') côté Twig
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            "X-Requested-With": "XMLHttpRequest"
          },
          body: ""
        }).then(function (res) {
          return res.json();
        }).then(function (data) {
          return data.success && window.location.reload();
        });
      }
    });
  }

  // Suppression d’un seul item
  document.querySelectorAll(".remove-history-item").forEach(function (button) {
    button.addEventListener("click", function () {
      var _this = this;
      var id = this.dataset.id;
      fetch("/history/remove/".concat(id), {
        // à adapter selon ta route
        method: "POST",
        headers: {
          "X-Requested-With": "XMLHttpRequest"
        }
      }).then(function (res) {
        return res.json();
      }).then(function (data) {
        if (data.success) {
          var card = _this.closest(".glass-effect");
          card && card.remove();
          if (document.querySelectorAll(".glass-effect").length === 0) {
            window.location.reload();
          }
        }
      });
    });
  });
});

/***/ })

},
/******/ __webpack_require__ => { // webpackRuntimeModules
/******/ var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
/******/ __webpack_require__.O(0, ["vendors-node_modules_core-js_internals_array-slice_js-node_modules_core-js_internals_environm-6766de","vendors-node_modules_core-js_internals_an-instance_js-node_modules_core-js_internals_define-b-9a7a2a","vendors-node_modules_core-js_modules_es_promise_js","vendors-node_modules_core-js_modules_es_array_for-each_js-node_modules_core-js_modules_esnext-3c8b62"], () => (__webpack_exec__("./assets/js/account_history.js")));
/******/ var __webpack_exports__ = __webpack_require__.O();
/******/ }
]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWNjb3VudF9oaXN0b3J5LmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBR0FBLFFBQVEsQ0FBQ0MsZ0JBQWdCLENBQUMsa0JBQWtCLEVBQUUsWUFBWTtFQUN4RDtFQUNBLElBQU1DLFFBQVEsR0FBR0YsUUFBUSxDQUFDRyxjQUFjLENBQUMsaUJBQWlCLENBQUM7RUFDM0QsSUFBSUQsUUFBUSxFQUFFO0lBQ1pBLFFBQVEsQ0FBQ0QsZ0JBQWdCLENBQUMsT0FBTyxFQUFFLFlBQVk7TUFDN0MsSUFBSUcsT0FBTyxDQUFDLG1EQUFtRCxDQUFDLEVBQUU7UUFDaEVDLEtBQUssQ0FBQyxnQkFBZ0IsRUFBRTtVQUN0QjtVQUNBQyxNQUFNLEVBQUUsTUFBTTtVQUNkQyxPQUFPLEVBQUU7WUFDUCxjQUFjLEVBQUUsbUNBQW1DO1lBQ25ELGtCQUFrQixFQUFFO1VBQ3RCLENBQUM7VUFDREMsSUFBSSxFQUFFO1FBQ1IsQ0FBQyxDQUFDLENBQ0NDLElBQUksQ0FBQyxVQUFDQyxHQUFHO1VBQUEsT0FBS0EsR0FBRyxDQUFDQyxJQUFJLENBQUMsQ0FBQztRQUFBLEVBQUMsQ0FDekJGLElBQUksQ0FBQyxVQUFDRyxJQUFJO1VBQUEsT0FBS0EsSUFBSSxDQUFDQyxPQUFPLElBQUlDLE1BQU0sQ0FBQ0MsUUFBUSxDQUFDQyxNQUFNLENBQUMsQ0FBQztRQUFBLEVBQUM7TUFDN0Q7SUFDRixDQUFDLENBQUM7RUFDSjs7RUFFQTtFQUNBaEIsUUFBUSxDQUFDaUIsZ0JBQWdCLENBQUMsc0JBQXNCLENBQUMsQ0FBQ0MsT0FBTyxDQUFDLFVBQUNDLE1BQU0sRUFBSztJQUNwRUEsTUFBTSxDQUFDbEIsZ0JBQWdCLENBQUMsT0FBTyxFQUFFLFlBQVk7TUFBQSxJQUFBbUIsS0FBQTtNQUMzQyxJQUFNQyxFQUFFLEdBQUcsSUFBSSxDQUFDQyxPQUFPLENBQUNELEVBQUU7TUFDMUJoQixLQUFLLG9CQUFBa0IsTUFBQSxDQUFvQkYsRUFBRSxHQUFJO1FBQzdCO1FBQ0FmLE1BQU0sRUFBRSxNQUFNO1FBQ2RDLE9BQU8sRUFBRTtVQUFFLGtCQUFrQixFQUFFO1FBQWlCO01BQ2xELENBQUMsQ0FBQyxDQUNDRSxJQUFJLENBQUMsVUFBQ0MsR0FBRztRQUFBLE9BQUtBLEdBQUcsQ0FBQ0MsSUFBSSxDQUFDLENBQUM7TUFBQSxFQUFDLENBQ3pCRixJQUFJLENBQUMsVUFBQ0csSUFBSSxFQUFLO1FBQ2QsSUFBSUEsSUFBSSxDQUFDQyxPQUFPLEVBQUU7VUFDaEIsSUFBTVcsSUFBSSxHQUFHSixLQUFJLENBQUNLLE9BQU8sQ0FBQyxlQUFlLENBQUM7VUFDMUNELElBQUksSUFBSUEsSUFBSSxDQUFDRSxNQUFNLENBQUMsQ0FBQztVQUNyQixJQUFJMUIsUUFBUSxDQUFDaUIsZ0JBQWdCLENBQUMsZUFBZSxDQUFDLENBQUNVLE1BQU0sS0FBSyxDQUFDLEVBQUU7WUFDM0RiLE1BQU0sQ0FBQ0MsUUFBUSxDQUFDQyxNQUFNLENBQUMsQ0FBQztVQUMxQjtRQUNGO01BQ0YsQ0FBQyxDQUFDO0lBQ04sQ0FBQyxDQUFDO0VBQ0osQ0FBQyxDQUFDO0FBQ0osQ0FBQyxDQUFDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vLy4vYXNzZXRzL2pzL2FjY291bnRfaGlzdG9yeS5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJcblxuXG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwiRE9NQ29udGVudExvYWRlZFwiLCBmdW5jdGlvbiAoKSB7XG4gIC8vIEdlc3Rpb24gZHUgYm91dG9uIFwiVmlkZXIgbCdoaXN0b3JpcXVlXCJcbiAgY29uc3QgY2xlYXJCdG4gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImNsZWFySGlzdG9yeUJ0blwiKTtcbiAgaWYgKGNsZWFyQnRuKSB7XG4gICAgY2xlYXJCdG4uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGZ1bmN0aW9uICgpIHtcbiAgICAgIGlmIChjb25maXJtKFwiw4p0ZXMtdm91cyBzw7tyIGRlIHZvdWxvaXIgdmlkZXIgdm90cmUgaGlzdG9yaXF1ZSA/XCIpKSB7XG4gICAgICAgIGZldGNoKFwiL2hpc3RvcnkvY2xlYXJcIiwge1xuICAgICAgICAgIC8vIG91IHV0aWxpc2UgcGF0aCgnYXBwX2hpc3RvcnlfY2xlYXInKSBjw7R0w6kgVHdpZ1xuICAgICAgICAgIG1ldGhvZDogXCJQT1NUXCIsXG4gICAgICAgICAgaGVhZGVyczoge1xuICAgICAgICAgICAgXCJDb250ZW50LVR5cGVcIjogXCJhcHBsaWNhdGlvbi94LXd3dy1mb3JtLXVybGVuY29kZWRcIixcbiAgICAgICAgICAgIFwiWC1SZXF1ZXN0ZWQtV2l0aFwiOiBcIlhNTEh0dHBSZXF1ZXN0XCIsXG4gICAgICAgICAgfSxcbiAgICAgICAgICBib2R5OiBcIlwiLFxuICAgICAgICB9KVxuICAgICAgICAgIC50aGVuKChyZXMpID0+IHJlcy5qc29uKCkpXG4gICAgICAgICAgLnRoZW4oKGRhdGEpID0+IGRhdGEuc3VjY2VzcyAmJiB3aW5kb3cubG9jYXRpb24ucmVsb2FkKCkpO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgLy8gU3VwcHJlc3Npb24gZOKAmXVuIHNldWwgaXRlbVxuICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLnJlbW92ZS1oaXN0b3J5LWl0ZW1cIikuZm9yRWFjaCgoYnV0dG9uKSA9PiB7XG4gICAgYnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBmdW5jdGlvbiAoKSB7XG4gICAgICBjb25zdCBpZCA9IHRoaXMuZGF0YXNldC5pZDtcbiAgICAgIGZldGNoKGAvaGlzdG9yeS9yZW1vdmUvJHtpZH1gLCB7XG4gICAgICAgIC8vIMOgIGFkYXB0ZXIgc2Vsb24gdGEgcm91dGVcbiAgICAgICAgbWV0aG9kOiBcIlBPU1RcIixcbiAgICAgICAgaGVhZGVyczogeyBcIlgtUmVxdWVzdGVkLVdpdGhcIjogXCJYTUxIdHRwUmVxdWVzdFwiIH0sXG4gICAgICB9KVxuICAgICAgICAudGhlbigocmVzKSA9PiByZXMuanNvbigpKVxuICAgICAgICAudGhlbigoZGF0YSkgPT4ge1xuICAgICAgICAgIGlmIChkYXRhLnN1Y2Nlc3MpIHtcbiAgICAgICAgICAgIGNvbnN0IGNhcmQgPSB0aGlzLmNsb3Nlc3QoXCIuZ2xhc3MtZWZmZWN0XCIpO1xuICAgICAgICAgICAgY2FyZCAmJiBjYXJkLnJlbW92ZSgpO1xuICAgICAgICAgICAgaWYgKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIuZ2xhc3MtZWZmZWN0XCIpLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgICB3aW5kb3cubG9jYXRpb24ucmVsb2FkKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9KTtcbiAgfSk7XG59KTtcbiJdLCJuYW1lcyI6WyJkb2N1bWVudCIsImFkZEV2ZW50TGlzdGVuZXIiLCJjbGVhckJ0biIsImdldEVsZW1lbnRCeUlkIiwiY29uZmlybSIsImZldGNoIiwibWV0aG9kIiwiaGVhZGVycyIsImJvZHkiLCJ0aGVuIiwicmVzIiwianNvbiIsImRhdGEiLCJzdWNjZXNzIiwid2luZG93IiwibG9jYXRpb24iLCJyZWxvYWQiLCJxdWVyeVNlbGVjdG9yQWxsIiwiZm9yRWFjaCIsImJ1dHRvbiIsIl90aGlzIiwiaWQiLCJkYXRhc2V0IiwiY29uY2F0IiwiY2FyZCIsImNsb3Nlc3QiLCJyZW1vdmUiLCJsZW5ndGgiXSwic291cmNlUm9vdCI6IiJ9