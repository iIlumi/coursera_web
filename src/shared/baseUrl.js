export const baseUrl = 'http://localhost:3001/';

/**
 * json-server --watch db_coursera.json -p 3001 -d 2000
 * port 3001 , delay 2000ms = 2s
 *
 *
 * http://localhost:3001/dishes
 * http://localhost:3001/promotions
 * http://localhost:3001/leaders
 * http://localhost:3001/feedback
 *
 * The json-server also provides a static web server. Any resources that you put in a folder named public in the json-server folder above, will be served by the server at the following address: baseUrl, ex:
 *
 * Nếu muốn load resource phả đặt trong thử mục public trước -
 * Nếu ko có public thì sẽ load được html default của json-server
 * Nhưng ko quan trọng, demo ko lộ link gì cả, tự mod được
 *
 * http://localhost:3001/images/<image name>.png
 * http://localhost:3001/images/logo.png
 *
 */
