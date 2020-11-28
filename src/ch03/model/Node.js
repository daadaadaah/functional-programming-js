/**
 * Chapter 3 model class Node for tree navigation
 */
// helper function internal to the module
const _ = require('lodash');

const isValid = val => !_.isUndefined(val) && !_.isNull(val);	

exports.Node = class Node {
	constructor(val) {
		this._val = val;
		this._parent = null;
		this._children = [];
	}

	isRoot() {
		return !isValid(this._parent);
	}
	
	get children() {
		return this._children;
	}
	
	hasChildren() {
		return this._children.length > 0;
	}
	
	get value() {
		return this._val;
	}
	
	set value(val) {
		this._val = val;
	}
	
	append(child) {
		child._parent = this; // 부모 노르를 세팅한다.
		this._children.push(child); // 자식 리스트에서 자식 노드를 추가한다.
		return this; // 동일한 노드를 반환한다. (이렇게 해야 메서드를 흘릴 때 편하다)
	}
	
	toString() {
		return `Node (val: ${this._val}, children:
			${this._children.length})`;
	}
};
