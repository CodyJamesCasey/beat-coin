(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({"/home/tudev/beat-coin/frontend/js/main.js":[function(require,module,exports){
"use strict";

var Router = React.createClass({
	displayName: "Router",

	changePage: function changePage(event) {
		var currentPage = this.state.initialPage;
		currentPage = event;
		this.setState({ currentPage: currentPage });
	},

	getInitialState: function getInitialState() {
		return {
			initialPage: "home",
			currentPage: ""
		};
	},

	componentWillMount: function componentWillMount() {
		this.setState({ currentPage: this.state.initialPage });
	},

	render: function render() {
		return React.createElement(
			"body",
			null,
			React.createElement(Header, { changePage: this.changePage }),
			React.createElement(MainPage, { currentPage: this.state.currentPage }),
			React.createElement(Footer, { currentPage: this.state.currentPage })
		);
	}
});

React.render(React.createElement(Router, null), document.body);

},{}]},{},["/home/tudev/beat-coin/frontend/js/main.js"])
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIvaG9tZS90dWRldi9iZWF0LWNvaW4vZnJvbnRlbmQvanMvbWFpbi5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7O0FDQUEsSUFBSSxNQUFNLEdBQUcsS0FBSyxDQUFDLFdBQVcsQ0FBQzs7O0FBRTlCLFdBQVUsRUFBRSxvQkFBUyxLQUFLLEVBQUM7QUFDdkIsTUFBSSxXQUFXLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxXQUFXLENBQUM7QUFDekMsYUFBVyxHQUFHLEtBQUssQ0FBQztBQUNwQixNQUFJLENBQUMsUUFBUSxDQUFDLEVBQUMsV0FBVyxFQUFFLFdBQVcsRUFBQyxDQUFDLENBQUM7RUFDN0M7O0FBRUQsZ0JBQWUsRUFBQywyQkFBVTtBQUN6QixTQUFPO0FBQ04sY0FBVyxFQUFFLE1BQU07QUFDbkIsY0FBVyxFQUFFLEVBQUU7R0FDZixDQUFBO0VBQ0Q7O0FBRUQsbUJBQWtCLEVBQUUsOEJBQVU7QUFDN0IsTUFBSSxDQUFDLFFBQVEsQ0FBQyxFQUFDLFdBQVcsRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLFdBQVcsRUFBQyxDQUFDLENBQUE7RUFDcEQ7O0FBRUQsT0FBTSxFQUFFLGtCQUFVO0FBQ2xCLFNBQ0c7OztHQUNELG9CQUFDLE1BQU0sSUFBQyxVQUFVLEVBQUUsSUFBSSxDQUFDLFVBQVUsQUFBQyxHQUFHO0dBQ3ZDLG9CQUFDLFFBQVEsSUFBQyxXQUFXLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxXQUFXLEFBQUMsR0FBRztHQUNqRCxvQkFBQyxNQUFNLElBQUMsV0FBVyxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsV0FBVyxBQUFDLEdBQUc7R0FDekMsQ0FDSjtFQUNIO0NBQ0QsQ0FBQyxDQUFDOztBQUVILEtBQUssQ0FBQyxNQUFNLENBQUMsb0JBQUMsTUFBTSxPQUFFLEVBQUUsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsInZhciBSb3V0ZXIgPSBSZWFjdC5jcmVhdGVDbGFzcyh7XG5cblx0Y2hhbmdlUGFnZTogZnVuY3Rpb24oZXZlbnQpe1xuICAgIFx0dmFyIGN1cnJlbnRQYWdlID0gdGhpcy5zdGF0ZS5pbml0aWFsUGFnZTtcbiAgICBcdGN1cnJlbnRQYWdlID0gZXZlbnQ7XG4gICAgXHR0aGlzLnNldFN0YXRlKHtjdXJyZW50UGFnZTogY3VycmVudFBhZ2V9KTtcblx0fSxcblxuXHRnZXRJbml0aWFsU3RhdGU6ZnVuY3Rpb24oKXtcblx0XHRyZXR1cm4ge1xuXHRcdFx0aW5pdGlhbFBhZ2U6ICdob21lJyxcblx0XHRcdGN1cnJlbnRQYWdlOiAnJ1xuXHRcdH1cblx0fSxcblxuXHRjb21wb25lbnRXaWxsTW91bnQ6IGZ1bmN0aW9uKCl7XG4gIHRoaXMuc2V0U3RhdGUoe2N1cnJlbnRQYWdlOiB0aGlzLnN0YXRlLmluaXRpYWxQYWdlfSlcblx0fSxcblxuXHRyZW5kZXI6IGZ1bmN0aW9uKCl7XG5cdHJldHVybiAoXG4gICAgPGJvZHk+XG5cdFx0XHQ8SGVhZGVyIGNoYW5nZVBhZ2U9e3RoaXMuY2hhbmdlUGFnZX0gLz5cblx0XHRcdDxNYWluUGFnZSBjdXJyZW50UGFnZT17dGhpcy5zdGF0ZS5jdXJyZW50UGFnZX0gLz5cblx0XHRcdDxGb290ZXIgY3VycmVudFBhZ2U9e3RoaXMuc3RhdGUuY3VycmVudFBhZ2V9IC8+XG5cdFx0PC9ib2R5PlxuICBcdCk7XG5cdH1cbn0pO1xuXG5SZWFjdC5yZW5kZXIoPFJvdXRlci8+LCBkb2N1bWVudC5ib2R5KTtcbiJdfQ==
