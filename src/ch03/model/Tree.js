/**
 * Simple tree class
 * Author: Luis Atencio
 */

const _ = require('lodash');

// root node가 포함된 재귀적인 자료구조
class Tree {
	constructor(root) {
		this._root = root;
	}
	
	// 이 메서드보다 더 많이 쓰는 Array.prototype.map과 혼동하지 않게 정적 메서드로 한다.
	// 정적 메서드는 사실상 독립형 함수로 쓸 수 있다.
	static map(node, fn, tree = null) {
		node.value = fn(node.value); // 이터레이터 함수를 실행하여 Tree의 Node 값을 업데이트한다.
		if(tree === null) {
			tree = new Tree(node); // Array.prototype.map과 비슷하다. 새로운 트리를 만든다.
		}
		if(node.hasChildren()) { // 자식이 없는 노드는 계쏙할 필요가 없다. (기저 케이스)
			_.map(node.children, function (child) { // 각 자식 노드에 주어진 함수를 실행한다.
				Tree.map(child, fn, tree); // 각 자식 노드를 재귀 호출한다.
			});
		}
		return tree;
	}

	get root() {
		return this._root;
	}

	toArray(node = null, arr = []) {
		if(node === null) {
			node = this._root;
		}
		arr.push(node.value);
		// Base case
		if(node.hasChildren()) {
			var that = this; // TODO revisit Lodash doc to insert objec context
			_.map(node.children, function (child) {
				that.toArray(child, arr);
			});	
		}		
		return arr;
	}
}

exports.Tree = Tree;