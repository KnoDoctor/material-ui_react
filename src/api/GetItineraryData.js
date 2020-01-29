export default function GetItineraryData() {
    /**
     * Changes XML to JSON
     * Modified version from here: http://davidwalsh.name/convert-xml-json
     * @param {string} xml XML DOM tree
     */
    function xmlToJson(xml) {
        // Create the return object
        var obj = {};

        if (xml.nodeType === 1) {
            // element
            // do attributes
            if (xml.attributes.length > 0) {
                obj["tripDetails"] = {};
                for (var j = 0; j < xml.attributes.length; j++) {
                    var attribute = xml.attributes.item(j);
                    obj["tripDetails"][attribute.nodeName] =
                        attribute.nodeValue;
                }
            }
        } else if (xml.nodeType === 3) {
            // text
            obj = xml.nodeValue;
        }

        // do children
        // If all text nodes inside, get concatenated text from them.
        var textNodes = [].slice.call(xml.childNodes).filter(function(node) {
            return node.nodeType === 3;
        });
        if (xml.hasChildNodes() && xml.childNodes.length === textNodes.length) {
            obj = [].slice.call(xml.childNodes).reduce(function(text, node) {
                return text + node.nodeValue;
            }, "");
        } else if (xml.hasChildNodes()) {
            for (var i = 0; i < xml.childNodes.length; i++) {
                var item = xml.childNodes.item(i);
                var nodeName = item.nodeName;
                if (typeof obj[nodeName] == "undefined") {
                    obj[nodeName] = xmlToJson(item);
                } else {
                    if (typeof obj[nodeName].push == "undefined") {
                        var old = obj[nodeName];
                        obj[nodeName] = [];
                        obj[nodeName].push(old);
                    }
                    obj[nodeName].push(xmlToJson(item));
                }
            }
        }
        return obj;
    }

    /*
  Usage:
  1. If you have an XML file URL:
  const response = await fetch('file_url');
  const xmlString = await response.text();
  var XmlNode = new DOMParser().parseFromString(xmlString, 'text/xml');
  xmlToJson(XmlNode);
  2. If you have an XML as string:
  var XmlNode = new DOMParser().parseFromString(yourXmlString, 'text/xml');
  xmlToJson(XmlNode);
  3. If you have the XML as a DOM Node:
  xmlToJson(YourXmlNode);
  */

    const proxyurl = "https://cors-anywhere.herokuapp.com/";
    const url = "http://proxy.butterfield.com/itinerarycli/data.xml"; // site that doesn’t send Access-Control-*
    fetch(proxyurl + url) // https://cors-anywhere.herokuapp.com/https://example.com
        .then(response => response.text())
        .then(contents => {
            var xmlDOM = new DOMParser().parseFromString(contents, "text/xml");
            var jsonObject = xmlToJson(xmlDOM);
            var tripItineraryData = jsonObject.Itineraries.Itinerary;

            sessionStorage.setItem(
                "tripItineraryData",
                JSON.stringify({
                    tripItineraryData: tripItineraryData
                })
            );
            console.log(tripItineraryData);
        })
        .catch(() =>
            console.log(
                "Can’t access " + url + " response. Blocked by browser?"
            )
        );
}
