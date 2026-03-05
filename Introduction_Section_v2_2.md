1. Introduction

Silicon carbide (SiC) ceramics are among the most versatile structural materials available today, owing to their exceptional hardness, high-temperature stability, chemical inertness, and favorable thermal conductivity [1,2]. These attributes have made SiC ceramics indispensable in aerospace propulsion, advanced electronics, and energy-conversion systems [3]. However, the intrinsic electrical conductivity of pure SiC (∼10⁻⁶–10⁻² S·m⁻¹) is too low for applications such as Joule heating elements, electromagnetic interference (EMI) shielding, electrostatic discharge (ESD) substrates, and electrochemical electrodes [4,5]. Overcoming this limitation without sacrificing the mechanical and thermal advantages of the SiC matrix is therefore a key challenge in current ceramic engineering [6].

Since its isolation in 2004 [7], graphene has attracted enormous attention as a multifunctional filler for ceramic matrices due to its outstanding electrical conductivity (∼10⁶ S·m⁻¹), high specific surface area (2630 m²·g⁻¹), and remarkable mechanical strength (∼130 GPa intrinsic strength) [8,9,10,11]. In SiC-based composites, graphene nanoplatelets (GNPs) form a percolative conductive network at relatively low filler loadings, boosting room-temperature conductivity by up to three to four orders of magnitude compared with the undoped matrix [12,13]. Moreover, the two-dimensional morphology of GNPs activates crack-deflection and crack-bridging toughening mechanisms that simultaneously improve fracture toughness [8,14]. Recent comprehensive reviews have summarized the processing routes, microstructural design, and multifunctional properties of graphene/SiC composite ceramics [9,10,11,15].

Conventionally, dense graphene/SiC composites are produced by hot-pressing (HP) or spark plasma sintering (SPS) at temperatures above 1800 °C and pressures of 30–50 MPa [12,13]. While these techniques yield high relative densities (≥98%), they are inherently limited to simple bulk geometries—plates, discs, or cylinders—and the uniaxial pressure applied during sintering induces strong preferential alignment of GNPs perpendicular to the pressing axis, resulting in pronounced anisotropy of both electrical and thermal conductivity [13,15]. Furthermore, high sintering temperatures can degrade graphene through thermal reduction or reaction with the SiC matrix, diminishing the intended property enhancements [8,9]. These constraints motivate the exploration of additive manufacturing (AM) routes that can create three-dimensional architectured composites with controlled porosity and topology at substantially lower processing temperatures [1,2].

Among the various AM techniques applicable to ceramics, direct ink writing (DIW)—also termed robocasting—has emerged as a particularly attractive approach [2,5,16]. In DIW, a viscoelastic ceramic-loaded ink is extruded through a fine nozzle in a computer-controlled pattern, enabling layer-by-layer construction of complex three-dimensional lattice structures with programmable pore size, strut diameter, and stacking architecture [17,18,19]. The technique operates at ambient temperature and pressure, which preserves the structural integrity of carbon fillers such as graphene and carbon nanotubes [20,21,22]. Significant progress has been made in ceramic DIW ink formulation, with recent meta-analyses and reviews systematically mapping the relationships among solid loading, rheological parameters, and printability [17,18,23,24].

The pioneering work of Román-Manso et al. [25] demonstrated that graphene/SiC scaffold structures fabricated by DIW and partially sintered at 1500“1800 °C can reach effective conductivities on the order of 611 S·m⁻¹, a value governed not only by the graphene content but also by the lattice architecture. Subsequent studies by Moyano et al. [3,26,27] explored multiscale porosity design, recycling of robocast scraps, and the influence of partial sintering on the mechanical and electrical performance of these composites. Moreno-Sanabria et al. [28,29,30] extended the DIW approach to coaxial multi-material scaffolds and investigated the effective mechanical properties of highly porous 3D-printed structures using both experiment and finite element modelling (FEM). An et al. [31] reported 3D-printed SiC lattices with conductivities exceeding 1000 S·m⁻¹ through polymer-derived ceramic processing, while Xiao et al. [32] achieved 670 S·m⁻¹ in DIW graphene/SiCp/SiC composites via a similar route.

A critical yet under-explored variable in these studies is the role of lattice topology—i.e., the geometric arrangement of filaments within the structure—in determining the effective electrical transport properties of DIW ceramics. Different stacking patterns (e.g., orthogonal grid, rotated honeycomb, offset scaffold) produce fundamentally different interlayer contact areas, filament alignment relative to the applied electric field, and current density distributions [6,25]. Tabares et al. [6] showed that lattice topology strongly influences the mechanical response of DIW structures, and analogous architecture-dependent effects on electrical properties have been observed for 3D-printed graphene-based composites [33,34,35]. However, a systematic comparison of multiple lattice topologies under identical material and printing conditions, with explicit quantification of the topology–conductivity relationship, remains absent in the literature.

Finite element modelling (FEM) provides a powerful complementary approach for understanding these architecture–property relationships. By solving Maxwell’s equations (or their DC-conduction simplification) on a digitised representation of the actual lattice geometry, FEM can predict effective conductivity, map local current-density (J-field) distributions, and identify bottleneck regions that govern macroscopic transport [30,36]. Ramírez et al. [36] proposed an analytical/numerical model for the conductivity of bulk graphene/SiC nanocomposites, and Moreno-Sanabria et al. [30] recently demonstrated the use of FEM to explain the thermal behaviour of coaxially 3D-printed ceramic scaffolds. Despite these advances, no study has applied full three-dimensional FEM simulation—especially DC conduction analysis using commercial solvers such as ANSYS Maxwell 3D—to compare the electrical performance of different DIW lattice architectures of graphene/SiC composites, correlating the simulation output with experimentally measured conductivities.

The present study addresses this gap by combining ANSYS Maxwell 3D DC conduction FEM simulation with four-probe experimental measurements to systematically investigate the effective electrical conductivity of three representative lattice architectures—Grid, Honeycomb, and Scaffold—fabricated from the same graphene/SiC composite ink by DIW. Specifically, the work aims to answer three research questions: (i) How does lattice architecture determine the effective conductivity σeff when the solid-phase volume fraction is held constant? (ii) What are the respective roles of the interlayer contact area (Aint) and filament–field alignment angle in governing the current transport? (iii) How do the local J-field distributions differ among the three architectures, and what functional trade-offs (uniformity vs. peak conductivity) do they imply?

The remainder of this paper is organised as follows. Section 2 describes the experimental procedures, including ink preparation, DIW printing parameters, sintering protocol, and four-probe electrical characterisation, as well as the FEM simulation methodology (solver settings, boundary conditions, mesh convergence, and post-processing). Section 3 presents the simulation and experimental results for the three lattice architectures, with a detailed analysis of conductivity, resistance, and current-density fields. Section 4 discusses the key findings in the context of the existing literature, and Section 5 summarises the conclusions and outlines future work.

References

[1] Lakhdar, Y. and Tuck, C. and Binner, J. and Terry, A. and Goodridge, R., Additive manufacturing of advanced ceramic materials, Progress in Materials Science, 116 (2021) 100736. https://doi.org/10.1016/j.pmatsci.2020.100736.

[2] Shahzad, Aamir and Lazoglu, Ismail, Direct ink writing (DIW) of structural and functional ceramics: Recent achievements and future challenges, Composites Part B: Engineering, 225 (2021) 109249. https://doi.org/10.1016/j.compositesb.2021.109249.

[3] Xu, Haichao and Liu, Yong and Chen, Zhonghua and Wang, Kan, Microstructure and mechanical properties of carbon nanotube-reinforced silicon carbide composites fabricated by direct ink writing and reaction bonding, Journal of Materials Science, 177 (2026) 289--302. https://doi.org/10.1007/s10853-026-12431-6.

[4] Ramírez, Cristina and Belmonte, Manuel and Miranzo, Pilar and Osendi, Maria Isabel, Applications of Ceramic/Graphene Composites and Hybrids, Materials, 14(8) (2021) 2071. https://doi.org/10.3390/ma14082071.

[5] Sesso, Mitchell L. and Slater, Sonya and Thornton, John and Franks, George V., Direct ink writing of hierarchical porous ultra‐high temperature ceramics (ZrB <sub>2</sub> ), Journal of the American Ceramic Society, 104(10) (2021) 4977-4990. https://doi.org/10.1111/jace.17911.

[6] Breda, Alessandro and Zanini, Alice and Campagnolo, Alberto and Corradetti, Stefano and Manzolaro, Mattia and Meneghetti, Giovanni and Colombo, Paolo and Ballan, Michele and Franchin, Giorgia, Production and mechanical characterization of Titanium Carbide ISOL target disks fabricated by direct ink writing, Ceramics International, 49(19) (2023) 31666-31678. https://doi.org/10.1016/j.ceramint.2023.07.121.

[7] Novoselov, K. S. and Geim, A. K. and Morozov, S. V. and Jiang, D. and Zhang, Y. and Dubonos, S. V. and Grigorieva, I. V. and Firsov, A. A., Electric Field Effect in Atomically Thin Carbon Films, Science, 306(5696) (2004) 666-669. https://doi.org/10.1126/science.1102896.

[8] Wang, Wen, Effects of TiN content on the properties of hot pressed TiB2–SiC ceramics, Ceramics International, 47(12) (2021) 16762-16769. https://doi.org/10.1016/j.ceramint.2021.02.248.

[9] Liu, Shaohui and Xin, Zhongyuan and Wang, Yuan and Hao, Haoshan and Jiao, Wang, Preparation and properties of SiC nanopowder/Ca3Co4O9+δ composite thermoelectric ceramics by spark plasma sintering, Journal of Materials Science: Materials in Electronics, 34(19) (2023) 1625--1651. https://doi.org/10.1007/s10854-023-10914-9.

[10] Han, Huali and Hu, Qiaolei and Yang, Xiaodong, Additive manufacturing of fiber-reinforced silicon carbide ceramic matrix composites: process optimization and performance control, Ceramics International, 51(25) (2025) 45205-45224. https://doi.org/10.1016/j.ceramint.2025.07.239.

[11] Khobragade, Nidhi, Graphene reinforced SiC ceramic composites using powder metallurgy route: A short review, Materials Today: Proceedings, 16(9) (2024) 3617--3635. https://doi.org/10.1016/j.matpr.2024.05.128.

[12] Li, Hong Wei and Zhao, Yi Peng and Chen, Guo Qing and Li, Ming Hao and Wei, Zhi Fan and Fu, Xue Song and Zhou, Wen Long, SiC-based ceramics with remarkable electrical conductivity prepared by ultrafast high-temperature sintering, Journal of the European Ceramic Society, 43(5) (2023) 2269-2274. https://doi.org/10.1016/j.jeurceramsoc.2022.12.025.

[13] Román-Manso, Benito and Domingues, Eddy and Figueiredo, Filipe M. and Belmonte, Manuel and Miranzo, Pilar, Enhanced electrical conductivity of silicon carbide ceramics by addition of graphene nanoplatelets, Journal of the European Ceramic Society, 35(10) (2015) 2723-2731. https://doi.org/10.1016/j.jeurceramsoc.2015.03.044.

[14] Almansoori, Alaa and Balázsi, Katalin and Balázsi, Csaba, Advances, Challenges, and Applications of Graphene and Carbon Nanotube-Reinforced Engineering Ceramics, Nanomaterials, 14(23) (2024) 1881. https://doi.org/10.3390/nano14231881.

[15] Miranzo, Pilar and Belmonte, Manuel and Osendi, M. Isabel, From bulk to cellular structures: A review on ceramic/graphene filler composites, Journal of the European Ceramic Society, 37(12) (2017) 3649-3672. https://doi.org/10.1016/j.jeurceramsoc.2017.03.016.

[16] Lewis, J. A., Direct Ink Writing of 3D Functional Materials, Advanced Functional Materials, 16(17) (2006) 2193-2204. https://doi.org/10.1002/adfm.200600434.

[17] Li, Zhuoqi Lucas and Zhou, Shitong and Saiz, Eduardo and Malik, Rohit, Ink formulation in direct ink writing of ceramics: A meta-analysis, Journal of the European Ceramic Society, 44(12) (2024) 6777-6796. https://doi.org/10.1016/j.jeurceramsoc.2024.05.014.

[18] Dey, Atreyee and Rashid, Md Bazlur and Wang, Fang and Mahmud, Shakil and Jin, Jiangnan, Direct ink writing 3D printing of ceramics: a review, Ceramics International, 50(24) (2024) 55027--55064. https://doi.org/10.1016/j.ceramint.2024.10.098.

[19] Feilden, Ezra and Blanca, Esther García-Tuñón and Giuliani, Finn and Saiz, Eduardo and Vandeperre, Luc, Robocasting of structural ceramic parts with hydrogel inks, Journal of the European Ceramic Society, 36(10) (2016) 2525-2533. https://doi.org/10.1016/j.jeurceramsoc.2016.03.001.

[20] Allen, Andrew J. and Levin, Igor and Maier, Russell A., Research, standards, and data needs for industrialization of ceramic direct ink writing, International Journal of Ceramic Engineering &amp; Science, 4(5) (2022) 302-308. https://doi.org/10.1002/ces2.10158.

[21] Elizarova, Iuliia S. and Vandeperre, Luc and Saiz, Eduardo, Conformable green bodies: Plastic forming of robocasted advanced ceramics, Journal of the European Ceramic Society, 40(2) (2020) 552-557. https://doi.org/10.1016/j.jeurceramsoc.2019.10.010.

[22] Zhao, Yongqin and Zhu, Junzhe and He, Wangyan and Liu, Yu and Sang, Xinxin and Liu, Ren, 3D printing of unsupported multi-scale and large-span ceramic via near-infrared assisted direct ink writing, Nature Communications, 14(1) (2023) 2381. https://doi.org/10.1038/s41467-023-38082-8.

[23] Shahzad, Asif and Mahajani, Aditya and Lazoglu, Ismail, An overview of ceramic 3D printing: the path towards industrialization, Journal of the European Ceramic Society, 43(16) (2023) 7482--7510. https://doi.org/10.1016/j.jeurceramsoc.2023.08.025.

[24] Bishop, Victoria and Mathur, Saket Chand and Nguyen, Nhu and Sharma, Bhisham and Drouin, Mary and Li, Bin and Park, Cheol and Wei, Wei, A review of direct ink writing of polymer derived ceramics, Virtual and Physical Prototyping, 20(1) (2025) 2499938. https://doi.org/10.1080/17452759.2025.2499938.

[25] Román-Manso, Benito and Figueiredo, Filipe M. and Achiaga, Beatriz and Barea, Rafael and Pérez-Coll, Domingo and Morelos-Gómez, Aaron and Terrones, Mauricio and Osendi, Maria Isabel and Belmonte, Manuel and Miranzo, Pilar, Electrically functional 3D-architectured graphene/SiC composites, Carbon, 100 (2016) 318-328. https://doi.org/10.1016/j.carbon.2015.12.103.

[26] Wang, Hong and Du, Hongbing and Wang, Shuai and Xing, Pengfei and Li, Haiyu and Zhuang, Yanxin, Direct ink writing for the formation of pressureless-sintered B4C-SiC composites, Ceramics International, 51(30) (2025) 65036-65050. https://doi.org/10.1016/j.ceramint.2025.11.065.

[27] Moyano, Juan Jos{\'e} and Belmonte, Manuel and Miranzo, Pilar and Osendi, Mar{\'\i}a Isabel, Recycling of graphene and silicon carbide from ground scraps of robocast structures for use in new ceramic inks, Ceramics International, 45(15) (2019) 18797--18805. https://doi.org/10.1016/j.ceramint.2019.06.109.

[28] Moreno‐Sanabria, Luis and Ramírez, Cristina and Osendi, María Isabel and Belmonte, Manuel and Miranzo, Pilar, Enhanced Thermal and Mechanical Properties of 3D Printed Highly Porous Structures Based on γ‐Al<sub>2</sub>O<sub>3</sub> by Adding Graphene Nanoplatelets, Advanced Materials Technologies, 7(9) (2022) 2101455. https://doi.org/10.1002/admt.202101455.

[29] Moreno-Sanabria, L. and Uhlířová, T. and Pabst, W. and Koller, M. and Seiner, H. and Osendi, M.I. and Belmonte, M. and Miranzo, P., Effective Young’s modulus of highly porous 3D printed mono-material and coaxial structures, Journal of the European Ceramic Society, 44(15) (2024) 116771. https://doi.org/10.1016/j.jeurceramsoc.2024.116771.

[30] Moreno-Sanabria, L. and Díaz-Herrezuelo, I. and Osendi, M.I. and Belmonte, M. and Miranzo, P., Coaxially 3D-printed ceramic scaffolds for thermal energy storage applications, Journal of the European Ceramic Society, 45(14) (2025) 117531. https://doi.org/10.1016/j.jeurceramsoc.2025.117531.

[31] Guo, Zipeng and An, Lu and Khuje, Saurabh and Chivate, Aditya and Li, Jiao and Wu, Yiquan and Hu, Yong and Armstrong, Jason and Ren, Shenqiang and Zhou, Chi, 3D-printed electrically conductive silicon carbide, Additive Manufacturing, 59 (2022) 103109. https://doi.org/10.1016/j.addma.2022.103109.

[32] Liu, Hongjun and Li, Yajun and Tang, Run and Li, Yamin, 3D Printing of Polymer-Derived Graphene/SiCp/SiC Composite by Direct Ink Writing, Crystals, 15(1) (2024) 11. https://doi.org/10.3390/cryst15010011.

[33] Wu, Ying and An, Chao and Guo, Yaru, 3D Printed Graphene and Graphene/Polymer Composites for Multifunctional Applications, Materials, 16(16) (2023) 5681. https://doi.org/10.3390/ma16165681.

[34] R, Hushein and Shajahan, Mohamed Iqbal and Čep, Robert and Salunkhe, Sachin and Murali, Arun Prasad and Sharad, Gawade and Mohamed Abdelmoneam Hussein, Hussein and Abouel Nasr, Emad, Electrical conductivity analysis of extrusion-based 3D-printed graphene, Frontiers in Materials, 11 (2024) 1328347. https://doi.org/10.3389/fmats.2024.1328347.

[35] Choi, Hyung Woo and Cox, Alex and Mofarah, Hamed Mohammadi and Jabbour, Ghassan, Mechanical and Electrical Properties of 3D‐Printed Highly Conductive Reduced Graphene Oxide/Polylactic Acid Composite, Advanced Engineering Materials, 26(5) (2024) 2301732. https://doi.org/10.1002/adem.202301732.

[36] Saheb, Nouari and Hayat, Umer, Electrical conductivity and thermal properties of spark plasma sintered Al2O3-SiC-CNT hybrid nanocomposites, Ceramics International, 43(7) (2017) 5715-5722. https://doi.org/10.1016/j.ceramint.2017.01.112.
