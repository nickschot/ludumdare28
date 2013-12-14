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

    chunkX, chunkY = (int(math.ceil(width / 25)), int(math.ceil(height / 19)))

    chunks = []
    for j in range(chunkY):
        currentArray = []
        for i in range(chunkX):
            xMin = i * 25
            xMax = (i+1) * 25
            yMin = j * 19
            yMax = (j+1) * 19

            arr = []
            for y in range(yMin, yMax):
                inner_arr = []
                for x in range(xMin, xMax):
                    if x < width and y < height:
                        r, g, b = rgb_im.getpixel((x, y))
                        kleurtje = hex(r * 2 ** 16 + g * 2 ** 8 + b)
                        inner_arr.append(kleurtje)
                    else:
                        inner_arr.append(0)
                arr.append(inner_arr)
            
            currentArray.append(arr)

        chunks.append(currentArray)

    f = open(sys.argv[2], 'w+')
    f.write(json.dumps(chunks))
    f.close
