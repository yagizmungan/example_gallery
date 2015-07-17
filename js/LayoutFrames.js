 /**
  * @param {Array<Object>} array of frame objects with height/width properties
  * @param {number} width of the containing element, in pixels
  * @param {number} maximum height of each row of images, in pixels
  * @param {number} spacing between images in a row, in pixels
  * @returns {Array<Array<Object>>} array of rows of resized frames
  */
layoutFrames =  function(images, containerWidth, maxRowHeight, spacing) {
	
	var matrix = [];												//object that will be returned

	//this is the container for the gallery
 	var container = document.createElement('div');
 	container.style.width = containerWidth;
 	container.setAttribute('class', 'gallery-container');

 	document.body.appendChild(container);

 	
 	var local_images = images,							//local_images will be used and manipulated
 			row_id = 0;													//id of the row 0 to N


 	//we will iterate through all the frames provided
 	//for loop creates the rows (outer loop)
 	//while loop creates the columnts (inner loop)
 	//for loop iterator i will be incremented during the inner loop
 	for(var i = 0; i < local_images.length; ) {
 		var row_filled = false,								//flag for checking if we have enough frames for a row
 				row = [],													//the contents of the current row
 				row_height;												//height of the row
 		
 		while(!row_filled){										
 			var current_width = 0;							//this is the width of the row

 			if(i < local_images.length){				//make sure for loop iterator is still inside the bounds				

 				//make sure image size is ok
 				if( local_images[i].height > (maxRowHeight) ){ 		
		 			local_images[i].width *= (maxRowHeight)/local_images[i].height;
		 			local_images[i].height = (maxRowHeight);
		 		}

		 		//first item of the row determines the height
		 		//and the following is scaled to that
 				if(row.length == 0){
 					row_height = local_images[i].height;
 				}
 				else {
 					local_images[i].width *= row_height/local_images[i].height;
 					local_images[i].height = row_height; 					
 				}

 				//add it to the row
	 			row.push(local_images[i]);

	 			//update the current width of the row
	 			for(var j = 0; j < row.length; j++){
	 				current_width += row[j].width;
	 			}


	 			//if we have perfectly filled the row
	 			//add the row to the matrix
	 			//otherwise scale the row elements based on the width and add to the matrix
	 			if(current_width >= containerWidth - ((j-1)*spacing) ){
	 				//if the row overflows as it is
	 				if(current_width > containerWidth - ((j-1)*spacing) ){
	 					//fit them to the row
		 				var new_ratio = (containerWidth - ((j-1)*spacing))/current_width;
		 				for (var k = row.length - 1; k >= 0; k--) {
		 					row[k].width *= new_ratio;
		 					row[k].height *= new_ratio;
		 				};
	 				}

	 				//round the numbers to nearest integer
	 				//introduces small inaccuracy and human readable size values
	 				for (var k = row.length - 1; k >= 0; k--) {
	 					row[k].width = Math.round(row[k].width);
	 					row[k].height = Math.round(row[k].height);
	 				};

	 				row_filled = true;
	 				matrix.push(row);
	 			}

	 			//now increment the for loop iterator manually
	 			i++;
 			}
 			else{
 				//we are out of elements so this is the incomplete last row
 				for (var k = row.length - 1; k >= 0; k--) {
 					row[k].width = Math.round(row[k].width);
 					row[k].height = Math.round(row[k].height);
 				};

 				row_filled = true;
 				matrix.push(row);
 			}
 		};

 		//row dom elment
 		var row_element = document.createElement('div');
 		row_element.setAttribute('id', 'row_'+row_id);
 		row_element.setAttribute('class', 'gallery-row');
 		//I decided to make the top/bottom margins controlled by the spacing based on the png but it could be coincidence
 		//so this can also go to css
 		if(row_id == 0){
 			row_element.style.marginTop = spacing;
 		}
 		row_element.style.marginBottom = 2*spacing; 		

 		container.appendChild(row_element);		

 		//create the dom elements for the frames
 		//for the image labels
 		//put them into a frame container
 		//and add everything to the dom
 		for(var l = 0; l < row.length; l++){
 			//this is the image container
 			var frame_content = document.createElement('div');
 			frame_content.setAttribute('class', 'frame-content');
 			frame_content.style.width = row[l].width;
 			frame_content.style.height = row[l].height;

 			//img element
 			var frame_content_image = document.createElement('img');
 			frame_content_image.setAttribute('class', 'gallery-image');
 			var image_source =  'http://www.placekitten.com/' + row[l].width + '/' + row[l].height;
 			frame_content_image.setAttribute('src', image_source);
 			frame_content_image.style.width = row[l].width;
 			frame_content_image.style.height = row[l].height;
 			frame_content.appendChild(frame_content_image);

 			//this is the text container
 			var frame_text_container = document.createElement('div');
 			frame_text_container.setAttribute('class', 'frame-text-container'); 	 			

 			//this is the text area
 			var frame_text_area = document.createElement('div');
 			frame_text_area.setAttribute('class', 'frame-text-area'); 
 			
 			//grab the left/right margin css values to define the text area
 			var text_area_margin_left;
 			var text_area_margin_right; 			
 			if(document.styleSheets[0].cssRules){
 				for (var css_index = document.styleSheets[0].cssRules.length - 1; css_index >= 0; css_index--) {
 					if(document.styleSheets[0].cssRules[css_index].selectorText == '.frame-text-area'){
 						text_area_margin_left = parseInt(document.styleSheets[0].cssRules[css_index].style.marginLeft);
 						text_area_margin_right =parseInt(document.styleSheets[0].cssRules[css_index].style.marginRight);
 					}
 				};
 			}
 			else{
 				//HACK fallback if we are testing with file system and not hosting the page
 				text_area_margin_left = 11;
 				text_area_margin_right = 22;
 			}

 			frame_text_area.style.width = row[l].width - text_area_margin_left - text_area_margin_right; 
 			frame_text_area.innerHTML = 'Sample Gallery Image';
 			frame_text_container.appendChild(frame_text_area);

 			//this is the frame container
 			var frame_container = document.createElement('div');
 			frame_container.setAttribute('class','frame-container');
 			frame_container.style.width = row[l].width;
 			frame_container.appendChild(frame_content);
 			frame_container.appendChild(frame_text_container);
 			if( !(l == row.length - 1) ){
 				frame_container.style.marginRight = spacing;
 			}

 			row_element.appendChild(frame_container);
 		};
 		//onto the next row
 		row_id++;						
 	};
  
  return matrix;
}

