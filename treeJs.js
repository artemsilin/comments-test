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

	var isEditClicked = false;

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
					childDiv.classList.add('comment');
				
				var textWrapper = document.createElement('div');
					textWrapper.classList.add('comment-text');

				var textArea = document.createElement('span');
					textArea.innerHTML = item[i].text;
					textArea.classList.add('txt');

				var buttonEdit = document.createElement("input");
					createElement(buttonEdit, "button", "butE" + i, "butE" + i, "Edit", 'btn');

				var buttonAdd = document.createElement("input");
					createElement(buttonAdd, "button", "bE" + i, "bE" + i, "Add", 'btn');

				var editTextArea = document.createElement('div');
					editTextArea.classList.add('comment');
					editTextArea.style.display = "none";	
					
					var textDiv = document.createElement('div');
						var textComArea = document.createElement('textarea');	
							textComArea.innerHTML = '';
							textComArea.rows = "3";
							textComArea.cols = "50";
							textComArea.name = "textComArea" + i;
							textComArea.addEventListener('change', changeComments(textComArea), false);

					textDiv.appendChild(textComArea);

					var buttonDiv = document.createElement('div');	
						var buttonOk = document.createElement("input");
							createElement(buttonOk, "button", "butE" + i, "butE" + i, "Ok", 'btn1');
						var buttonCancel = document.createElement("input");
							createElement(buttonCancel, "button", "bE" + i, "bE" + i, "Cancel", 'btn1');

					buttonDiv.appendChild(buttonOk);
					buttonDiv.appendChild(buttonCancel);
					
				editTextArea.appendChild(textDiv);
				editTextArea.appendChild(buttonDiv);	
				
				textWrapper.appendChild(textArea);
				textWrapper.appendChild(buttonEdit);
				textWrapper.appendChild(buttonAdd);

				childDiv.appendChild(textWrapper);


    			buttonEdit.addEventListener('click', editComments(editTextArea,  true), false);
				buttonOk.addEventListener('click', commentsNewEdit(item[i], childDiv, DIV, editTextArea, textArea, textComArea), false);
				buttonAdd.addEventListener('click', editComments(editTextArea,  false), false);


					if (item[i].comments.length > 0) {
					
						var commentsList = document.createElement('div');
							commentsList.classList.add('comments-list');

						childDiv.appendChild(editTextArea);
						childDiv.appendChild(commentsList);
						DIV.appendChild(childDiv);

						
						FillDivTree(item[i].comments, commentsList);
	
					} else {

						childDiv.appendChild(editTextArea);
						DIV.appendChild(childDiv);
						
						continue;
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

	function editComments (editDiv, isEdClick) {
		return function() {
			isEditClicked = isEdClick;
			editDiv.style.display = "block";
		}
	}

	function newComments () {



	}

	function commentsNewEdit(obj, div, parentDiv, editTextArea, commentArea,  editArea) {
		return function() {
			if (!isEditClicked) {

				var newComment = new Comment(getId(), editArea.innerHTML, obj.id);

				var commentsList = document.createElement('div');
					commentsList.classList.add('comments-list');

				div.appendChild(commentsList);

				if (obj.comments.length < 1) {
					
					obj.comments.push(newComment);

					parentDiv.appendChild(div);
						
					FillDivTree(obj.comments, commentsList);
	
				} else {

					var a = [];
						a.push(newComment);

					FillDivTree(a, commentsList);		
				}
			} else {
				editArea.text = commentArea.innerHTML;
				commentArea.innerHTML = editArea.innerHTML;
			}
			editTextArea.style.display = 'none';
			isEditClicked = false;
		}
	}

	function changeComments(textComArea) {
		return function () {
			textComArea.innerHTML = textComArea.value;
		}
	}

}, false)