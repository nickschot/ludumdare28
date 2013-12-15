from PIL import Image
import math, sys, json

import os.path

if __name__ == "__main__":

    if not(len(sys.argv) == 3 and os.path.isfile(sys.argv[1])):
        print "USAGE: python2 levelconverter.py inputfile outputfile"
        sys.exit(-1)

    im = Image.open(sys.argv[1])

    rgb_im = im.convert('RGB')
    (width, height) = im.size

    result = []
    for y in range(height):
        currentArray = []
        for x in range(width):
            r, g, b = rgb_im.getpixel((x, y))
            kleurtje = '%02x%02x%02x' % (r, g, b)
            currentArray.append(kleurtje)
                    
        result.append(currentArray)

    f = open(sys.argv[2], 'w+')
    f.write(json.dumps(result))
    f.close
