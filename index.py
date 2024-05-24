import os

def rename_images(directory):
    """
    Renames all files in the specified directory to a sequential format: img<number>.jpg.

    Args:
        directory (str): The path to the directory containing the images to rename.

    This function iterates over all files in the specified directory and renames them
    to follow the format img1.jpg, img2.jpg, ..., imgN.jpg, where N is the total number
    of files in the directory. The function prints a message for each file renamed.

    Example:
        If the directory contains files ['a.jpg', 'b.jpg', 'c.jpg'], after calling
        rename_images('./assets'), the files will be renamed to ['img1.jpg', 'img2.jpg', 'img3.jpg'].

    Note:
        This function assumes that all files in the directory should be renamed and does
        not filter by file type. Ensure the directory contains only the files you wish
        to rename to avoid unintended renaming of non-image files.
    """
    files = os.listdir(directory)
    images = [file for file in files]
    
    # Rename each image
    for i, filename in enumerate(images, start=1):
        new_name = f"img{i}.jpg"

        # Create the full path for the old and new names
        old_path = os.path.join(directory, filename)
        new_path = os.path.join(directory, new_name)

        os.rename(old_path, new_path)
        print(f"Renamed: {old_path} to {new_path}")


directory_path = './assets'
rename_images(directory_path)
