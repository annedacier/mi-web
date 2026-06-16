export interface Project {
  id: string;
  title: string;
  cover: string;
  images: string[];
}

export interface Category {
  id: string;
  label: string;
  projects: Project[];
}

export const portfolio: Category[] = [
  {
    id: "food-drink",
    label: "Food & Drink",
    projects: [
      {
        id: "restaurant",
        title: "Restaurant",
        cover: "/images/photo-01.jpg",
        images: [
          "/images/photo-01.jpg",
          "/images/photo-02.jpg",
          "/images/photo-03.jpg",
          "/images/photo-04.jpg",
        ],
      },
      {
        id: "wine-brand",
        title: "Wine Brand",
        cover: "/images/photo-03.jpg",
        images: [
          "/images/photo-03.jpg",
          "/images/photo-04.jpg",
          "/images/photo-01.jpg",
        ],
      },
      {
        id: "wine-brand",
        title: "Wine Brand",
        cover: "/images/photo-04.jpg",
        images: [
          "/images/photo-03.jpg",
          "/images/photo-04.jpg",
          "/images/photo-01.jpg",
        ],
      },
    ],
  },
  {
    id: "still-life",
    label: "Still Life",
    projects: [
      {
        id: "glass-series",
        title: "Glass Series",
        cover: "/images/photo-05.jpg",
        images: [
          "/images/photo-05.jpg",
          "/images/photo-06.jpg",
          "/images/photo-07.jpg",
          "/images/photo-08.jpg",
        ],
      },
      {
        id: "objects-of-light",
        title: "Objects of Light",
        cover: "/images/photo-07.jpg",
        images: [
          "/images/photo-07.jpg",
          "/images/photo-08.jpg",
          "/images/photo-05.jpg",
        ],
      },
    ],
  },
  {
    id: "portraits-places",
    label: "Portraits & Places",
    projects: [
      {
        id: "northern-portraits",
        title: "Northern Portraits",
        cover: "/images/photo-09.jpg",
        images: [
          "/images/photo-09.jpg",
          "/images/photo-10.jpg",
          "/images/photo-11.jpg",
        ],
      },
      {
        id: "quiet-places",
        title: "Quiet Places",
        cover: "/images/photo-12.jpg",
        images: [
          "/images/photo-12.jpg",
          "/images/photo-11.jpg",
          "/images/photo-10.jpg",
        ],
      },
    ],
  },
];

export const findProject = (id: string) => {
  for (const c of portfolio) {
    const p = c.projects.find((p) => p.id === id);
    if (p) return { project: p, category: c };
  }
  return undefined;
};