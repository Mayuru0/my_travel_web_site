
 interface Video {
  id: number
  title: string
  url: string
  thumbnail: string
  category: "cinematic" | "vlog"
  description?: string
  duration?: string
}

export const videos : Video[] = [
  {
      id: 1,
      title:
        "වෙල මැද පැලක රොටී හදලා කෑවා🍛🌾| Cooking Roti in the Middle of a Paddy Field | Srilanka | 4K ",
      thumbnail: "/thumbnail/wela.webp",
      url: "https://youtu.be/ImQpHYWog0s",
      category: "vlog",
      description: "මැද පැලක රොටී හදලා කෑවා",
      duration: "42:00",
      
    },
    {
      id: 2,
      title:
        "රිවස්ටන් වල නැරඹිය යුතුම ස්ථාන📸 | රිවස්ටන් | Riverston Matale | Srilanka | 4K | Vlog#10",
      thumbnail: "/thumbnail/Untitled-1.png",
      url: "https://youtu.be/K1UIHUqavuI?si=lf89Ll_nQDu749kz",
      category: "vlog",
      description: "රිවස්ටන් වල නැරඹිය යුතුම ස්ථාන📸 | රිවස්ටන් | Riverston Matale | Srilanka | 4K | Vlog#10",
      duration: "42:00",
      
    },
    {
      id: 3,
      title:
        "සිරිපා කරුණාව 2025🙏| රත්නපුර පලාබද්දල රජමාවත ඔස්සේ | Ratnapura Palabaddala Trail to Adam's peak🙏❤️",
      thumbnail: "/thumbnail/11.png",
      url: "https://youtu.be/vl7f1mO7PLw?si=Ko6yDOI_UW0MIg-Y",
      category: "vlog",
      description: "සිරිපා කරුණාව 2025🙏| රත්නපුර පලාබද්දල රජමාවත ඔස්සේ | Ratnapura Palabaddala Trail to Adam's peak🙏❤️",
      duration: "25:45",

    },
    {
      id: 4,
      title:
        "නුවරඑළිය සිට පට්ටිපොළ හරහා හෝර්ටන්තැන්නට 🥶❤| NuwaraEliya To Horton Plains Srilanka | Vlog #08",
      thumbnail: "/thumbnail/maxresdefault.webp",
      url: "https://youtu.be/VHekbVZAw98?si=qNYxwM4laUTX-VtL",
      category: "vlog",
      description: "නුවරඑළිය සිට පට්ටිපොළ හරහා හෝර්ටන්තැන්නට 🥶❤| NuwaraEliya To Horton Plains Srilanka | Vlog #08",
      duration: "44:22",
    },
  ];



  export const featured = [

     {
      id: 1,
      title:
        "වෙල මැද පැලක රොටී හදලා කෑවා🍛🌾| Cooking Roti in the Middle of a Paddy Field | Srilanka | 4K ",
      thumbnail: "/thumbnail/wela.webp",
      url: "https://youtu.be/ImQpHYWog0s",
    },
    {
      id: 2,
      title:
        "රිවස්ටන් වල නැරඹිය යුතුම ස්ථාන📸 | රිවස්ටන් | Riverston Matale | Srilanka | 4K | Vlog#10",
      thumbnail: "/thumbnail/Untitled-1.png",
      url: "https://youtu.be/K1UIHUqavuI?si=lf89Ll_nQDu749kz",
    },
    {
      id: 3,
      title:
        "සිරිපා කරුණාව 2025🙏| රත්නපුර පලාබද්දල රජමාවත ඔස්සේ | Ratnapura Palabaddala Trail to Adam's peak🙏❤️",
      thumbnail: "/thumbnail/11.png",
      url: "https://youtu.be/vl7f1mO7PLw?si=Ko6yDOI_UW0MIg-Y",
    },
    // {
    //   id: 4,
    //   title:
    //     "නුවරඑළිය සිට පට්ටිපොළ හරහා හෝර්ටන්තැන්නට 🥶❤| NuwaraEliya To Horton Plains Srilanka | Vlog #08",
    //   thumbnail: "/thumbnail/maxresdefault.webp",
    //   url: "https://youtu.be/VHekbVZAw98?si=qNYxwM4laUTX-VtL",
    // },
  ];