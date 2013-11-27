document.addEventListener('DOMContentLoaded', function(){

	var comment1 = new Comment(getId(), 'Yanukovych to go dick!');
	var comment2 = new Comment(getId(), 'Yes, they all get in a jam', comment1.id);
	var comment3 = new Comment(getId(), 'And what good did you?', comment2.id);
	var comment4 = new Comment(getId(), 'Yes, fucking herd of bulls', comment2.id);
	var comment5 = new Comment(getId(), 'I slept', comment3.id);
	var comment6 = new Comment(getId(), 'Kill them all', comment4.id);
	var comment7 = new Comment(getId(), 'Заебись ты чувак', comment5.id);
	var comment8 = new Comment(getId(), 'Заебись ты чувак12', comment3.id);

	var commentsData = [ comment1, comment2, comment3, comment4, comment5, comment6, comment7, comment8];
	var CommentsTree = []; 

	var ParentDiv =	document.createElement('div');


	fillTree(commentsData);
	FillDivTree(CommentsTree, ParentDiv);

	document.querySelector('.comments-wrapper').appendChild(ParentDiv);

	function Comment(id, text, parentId) {
		this.id = id;
		this.parentId = parentId || null;
		this.text = text;
		this.comments = [];
	}

	function getId() {
		return Number(Math.random().toString().slice(2)).toString(32);
	}	

	function fillTree(comments) {
	
		function fill(comment) {

			if(!comment.parentId) {

				CommentsTree.push(comment);
			}
			else {

				for(var i=0; i<commentsData.length; ++i) {

					var tmp = commentsData[i];
					if(tmp.id === comment.parentId) {

						tmp.comments.push(comment);
						break;
					}
				}
			}
		}
	
		comments.forEach(fill);
	}

	function FillDivTree(item, DIV) {
	
        	for(var i=0; i<item.length; i++) {
				
				var childDiv = document.createElement('div');
				
				var textWrapper = document.createElement('div');
					textWrapper.classList.add('comment-text');

				var textArea = document.createElement('input');
					createElement(textArea, "text", "tA"+i, "tA"+i, item[i].text, 'txt');
					textArea.disabled = true;
					textArea.onkeydown=textArea.onkeyup=textArea.onchange=textArea.onkeypress= function(){

 						 	if (this.value.length < 10) {

 						 		this.style.width = '60px';
 						 		return;
 						 	}
 					 	 	this.style.width = this.value.length*7 + "px";
					};

				var buttonEdit = document.createElement("input");
					createElement(buttonEdit, "button", "butE" + i, "butE" + i, "Edit", 'btn');
    				buttonEdit.addEventListener('click', editComments(textArea, buttonEdit), false);

				var buttonAdd = document.createElement("input");
					createElement(buttonAdd, "button", "bE" + i, "bE" + i, "Add", 'btn');


				textWrapper.appendChild(textArea);
				textWrapper.appendChild(buttonEdit);
				textWrapper.appendChild(buttonAdd);

				childDiv.appendChild(textWrapper);
					childDiv.classList.add('comment');


				buttonAdd.addEventListener('click', addComments(item, i, childDiv, DIV), false);


					if (item[i].comments.length > 0) {
					
						var commentsList = document.createElement('div');
							commentsList.classList.add('comments-list');

						childDiv.appendChild(commentsList);
						DIV.appendChild(childDiv);
						
						FillDivTree(item[i].comments, commentsList);
	
					} else {
	
						DIV.appendChild(childDiv);
						continue;
					}
        	}
	}

	function editComments (commentArea, btn) {
		return function() {
			if (btn.value === "Edit") {

				commentArea.disabled = false;
				btn.value = "Save";
			} else  {

				commentArea.disabled = true;
				btn.value = "Edit";
			}
		}
	}

	function createElement (obj, _type, _id, _name, _value, _class) {

		with (obj) {
		type = _type;
		id = _id;
		name = _name;
		value = _value;
		classList.add(_class);
		}
	}

	function addComments(obj, i, div, parentDiv) {
		return function() {

			var newComment = new Comment(getId(), "New", obj[i].id);

			if (obj[i].comments.length < 1) {
					
				obj[i].comments.push(newComment);

				var commentsList = document.createElement('div');
					commentsList.classList.add('comments-list');

				div.appendChild(commentsList);
				parentDiv.appendChild(div);
						
				FillDivTree(obj[i].comments, commentsList);
	
			} else {

				obj[i].comments.push(newComment);
				
				// var commentsList = document.createElement('div');
				// 	commentsList.classList.add('comment');

				//div.appendChild(commentsList);
				//parentDiv.appendChild(div);
				//alert(div.innerHTML);
				FillDivTree(obj[i].comments[obj[i].comments.length-1], div.childDiv);
				
			}
		}
	}

}, false)