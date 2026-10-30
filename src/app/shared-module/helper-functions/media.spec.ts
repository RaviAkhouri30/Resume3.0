import { profilePhoto, resumeDownload } from './media';

describe('media URLs', () => {
  const local = { cloudName: '', profilePhotoId: 'portfolio/profile', resumeId: 'portfolio/Ravi_Akhouri_Resume' };
  const cloud = { ...local, cloudName: 'demo' };

  it('falls back to bundled assets when Cloudinary is not configured', () => {
    expect(profilePhoto(local, 270)).toEqual({
      sources: [{ srcset: 'assets/profile.avif', type: 'image/avif' }],
      src: 'assets/profile.jpg',
      srcset: ''
    });
    expect(resumeDownload(local)).toEqual({ url: 'assets/Ravi_Akhouri_Resume.pdf', fileName: 'Ravi_Akhouri_Resume.pdf' });
  });

  it('builds 1x/2x auto-format Cloudinary photo URLs', () => {
    const photo = profilePhoto(cloud, 270);
    const base = 'https://res.cloudinary.com/demo/image/upload/f_auto,q_auto,c_fill,g_face,ar_1:1';

    expect(photo.sources).toEqual([]);
    expect(photo.src).toBe(`${base},w_540/portfolio/profile`);
    expect(photo.srcset).toBe(`${base},w_270/portfolio/profile 1x, ${base},w_540/portfolio/profile 2x`);
  });

  it('builds a Cloudinary resume URL that downloads with a friendly file name', () => {
    expect(resumeDownload(cloud).url).toBe(
      'https://res.cloudinary.com/demo/image/upload/fl_attachment:Ravi_Akhouri_Resume/portfolio/Ravi_Akhouri_Resume.pdf'
    );
  });
});
