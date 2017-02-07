import xml.etree.ElementTree as ET
import sys
ET.register_namespace('', "http://www.collada.org/2005/11/COLLADASchema")
fileName = sys.argv[1]
tree  = ET.parse(fileName+".DAE")
root = tree.getroot()
id = 1
def alterNode(node):
	if node.tag == '{http://www.collada.org/2005/11/COLLADASchema}node':
		if node.get('name') == None:
			print('untitled node found');
			global id
			txt = "node-{:d}".format(id);
			id = id + 1;
			node.set('id', txt)
			node.set('name', txt)
		else:
			print("found node name " + node.get('name'))

	for child in node:
		alterNode(child)

alterNode(root);

tree.write(fileName + "-output.DAE");
