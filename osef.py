import numpy as np
import matplotlib.pyplot as plt

# Load an image from file
image_path = 'ref.png'
ref = plt.imread(image_path)

image_path = 'marche.png'
diff = plt.imread(image_path)

# Compute the difference between the two images
diff = np.linalg.norm(ref - diff,axis = -1)

# Save the heatmap
plt.imsave('marche_heatmap.png', diff, cmap='hot')
plt.imshow(diff)
plt.show()
