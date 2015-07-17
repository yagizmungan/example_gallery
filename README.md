# example_gallery
This was an image gallery that I did as a code challenge back in the day. The challenge description was as follows:



For this challenge, we'd like to build a photo gallery with a fixed-width, multiple-row layout (see attached image).
There are a few constraints to consider when laying out the images in our photo gallery:
The order of images must be maintained.​
Images in the same row must have the same height, but must also maintain their aspect ratio (+/- 1px) and not be cropped. 
Rows are variable-height, but must be less than the maximum row height.
Every row except the last must have total width (including spacing between images) equal to the container width.
The last row must have total width less than or equal to the container width.
So the idea is to resize images so that they fit into neat fixed-width rows. You may assume that the input images are really high resolution.
