import { expect, test, vi } from "vitest";
import PhotographyPage from "./PhotographyPage";

/**
 * @jest-environment jsdom
 */

const mockPhoto = Object.freeze({
  server: 'mock-server',
  id: 'mock-id',
  secret: 'mock-secret',
  url_4k: 'https://live.staticflickr.com/srvr/id_scrt_4k.jpg',
  url_3k: 'https://live.staticflickr.com/srvr/id_scrt_3k.jpg',
  url_k: 'https://live.staticflickr.com/srvr/id_scrt_k.jpg',
  url_h: 'https://live.staticflickr.com/srvr/id_scrt_h.jpg'
});

test.each([
  { screenWidth: 3840, screenHeight: 2160, expectedUrl: mockPhoto.url_4k },
  { screenWidth: 2160, screenHeight: 3840, expectedUrl: mockPhoto.url_4k },
  { screenWidth: 3073, screenHeight: 1728, expectedUrl: mockPhoto.url_4k },
  { screenWidth: 3072, screenHeight: 1728, expectedUrl: mockPhoto.url_3k },
  { screenWidth: 2049, screenHeight: 1152, expectedUrl: mockPhoto.url_3k },
  { screenWidth: 2048, screenHeight: 1152, expectedUrl: mockPhoto.url_k },
  { screenWidth: 1601, screenHeight:  900, expectedUrl: mockPhoto.url_k },
  { screenWidth: 1600, screenHeight:  900, expectedUrl: mockPhoto.url_h },
  { screenWidth: 1025, screenHeight:  768, expectedUrl: mockPhoto.url_h },
  { screenWidth: 1024, screenHeight:  768, expectedUrl: 'https://live.staticflickr.com/mock-server/mock-id_mock-secret_b.jpg' },
  { screenWidth:  640, screenHeight:  480, expectedUrl: 'https://live.staticflickr.com/mock-server/mock-id_mock-secret_b.jpg' }
])('getPhotoUrl | $screenWidth x $screenHeight screen with all photo URLs defined', ({screenWidth, screenHeight, expectedUrl}) => {
  vi.stubGlobal('window', {
    screen: {
      availWidth: screenWidth,
      availHeight: screenHeight
    }
  });
  let page = new PhotographyPage();

  let photoUrl = page.getPhotoUrl(mockPhoto);

  expect(photoUrl).toEqual(expectedUrl);
});

test.each([
  { 
    photo: {
      url_4k: 'https://live.staticflickr.com/srvr/id_scrt_4k.jpg',
      url_3k: 'https://live.staticflickr.com/srvr/id_scrt_3k.jpg',
      url_k: 'https://live.staticflickr.com/srvr/id_scrt_k.jpg',
      url_h: 'https://live.staticflickr.com/srvr/id_scrt_h.jpg'
    },
    expectedUrl: 'https://live.staticflickr.com/srvr/id_scrt_4k.jpg'
  },
  { 
    photo: {
      url_3k: 'https://live.staticflickr.com/srvr/id_scrt_3k.jpg',
      url_k: 'https://live.staticflickr.com/srvr/id_scrt_k.jpg',
      url_h: 'https://live.staticflickr.com/srvr/id_scrt_h.jpg'
    },
    expectedUrl: 'https://live.staticflickr.com/srvr/id_scrt_3k.jpg'
  },
  { 
    photo: {
      url_k: 'https://live.staticflickr.com/srvr/id_scrt_k.jpg',
      url_h: 'https://live.staticflickr.com/srvr/id_scrt_h.jpg'
    },
    expectedUrl: 'https://live.staticflickr.com/srvr/id_scrt_k.jpg'
  },
  { 
    photo: {
      url_h: 'https://live.staticflickr.com/srvr/id_scrt_h.jpg'
    },
    expectedUrl: 'https://live.staticflickr.com/srvr/id_scrt_h.jpg'
  },
  { 
    photo: {
      server: 'mock-server',
      id: 'mock-id',
      secret: 'mock-secret'
    },
    expectedUrl: 'https://live.staticflickr.com/mock-server/mock-id_mock-secret_b.jpg'
  }
])('Given that screen is large, should fall back to highest-resolution URL available for photo', ({photo, expectedUrl}) => {
  vi.stubGlobal('window', {
    screen: {
      availWidth: 3840,
      availHeight: 2160
    }
  });
  let page = new PhotographyPage();

  let photoUrl = page.getPhotoUrl(photo);

  expect(photoUrl).toEqual(expectedUrl);
});
