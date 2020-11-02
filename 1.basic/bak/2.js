class Parent {
	//静态方法跟类有关系，跟实例没有关系
	static getParent() {
		console.log('getParent');
	}
	getName() {}
}
class Child extends Parent {
    // NOTE:如果Child没有下面这个getParent方法的话,则会去用Parent的
	static getParent() {
		console.log('getChild');
	}
}
Child.getParent();
